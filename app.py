import pandas as pd
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pyngrok import ngrok
import numpy as np
from waitress import serve 

app = Flask(__name__)

df = pd.read_csv('cleaned_movie_df.csv')

df['combined_features'] = df['title'] + ' ' + df['listed_in']

tfidf_vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
tfidf_matrix = tfidf_vectorizer.fit_transform(df['combined_features'])

cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

model = load_model('my_recommendation_model.h5')

def recommend_content_based_with_model(titles, df, cosine_sim, model=None):
    recommendations = []
    
    for title in titles:
        title_lower = title.lower()
        if title_lower not in df['title'].str.lower().values:
            recommendations.append({"title": title, "error": "Film tidak ditemukan!"})
            continue

        idx = df[df['title'].str.lower() == title_lower].index[0]
        
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:11]
        movie_indices = [i[0] for i in sim_scores]
        
        recommended_movies = df.iloc[movie_indices][['title', 'type', 'listed_in']]

        if model:
            tfidf_for_model = tfidf_matrix[movie_indices]
            predictions = model.predict(tfidf_for_model.toarray())  
            recommended_movies['predicted_rating'] = predictions.flatten() 
        
        recommendations.append({"title": title, "recommendations": recommended_movies.to_dict(orient='records')})
    
    return recommendations

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    titles = data['titles']

    if not isinstance(titles, list):
        return jsonify({"error": "Judul film harus berupa list!"}), 400
    
    recommendations = recommend_content_based_with_model(titles, df, cosine_sim, model)
    
    return jsonify(recommendations)

@app.route('/genres', methods=['GET'])
def get_genres():
    df['listed_in_list'] = df['listed_in'].str.split(', ')
    genres = pd.Series([genre for sublist in df['listed_in_list'] for genre in sublist])
    unique_genres = genres.dropna().unique().tolist()
    return jsonify(unique_genres)

@app.route('/content-types', methods=['GET'])
def get_content_types():
    types = df['type'].dropna().unique().tolist()
    return jsonify(types)

@app.route('/films', methods=['GET'])
def get_films():
    films = df[['title', 'type', 'listed_in']].dropna().to_dict(orient='records')
    return jsonify(films)

@app.route('/filter_films', methods=['POST'])
def filter_films():
    data = request.get_json()
    genres = data.get('genres', [])
    content_types = data.get('contentTypes', [])

    if not genres and not content_types:
        return jsonify({"error": "Harap masukkan jenis konten atau genre!"}), 400

    filtered_df = df
    if content_types:
        filtered_df = filtered_df[filtered_df['type'].isin(content_types)]
    if genres:
        filtered_df = filtered_df[filtered_df['listed_in'].str.contains('|'.join(genres), case=False, na=False)]

    filtered_films = filtered_df[['title', 'type', 'listed_in']].dropna().to_dict(orient='records')
    return jsonify(filtered_films)

@app.route('/')
def home():
    return 'Flask app berjalan, kirim POST ke /predict untuk mendapatkan rekomendasi!'

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5000)
