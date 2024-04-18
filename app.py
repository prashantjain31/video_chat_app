from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline, BartTokenizer, BartForConditionalGeneration
import os
import time
import shutil
from dotenv import load_dotenv
import gradio as gr
from llama_index import VectorStoreIndex, SimpleDirectoryReader
from llama_index.retrievers import VectorIndexRetriever
from llama_index.query_engine import RetrieverQueryEngine
from llama_index.indices.postprocessor import SimilarityPostprocessor
from llama_index.response.pprint_utils import pprint_response
from llama_index import StorageContext, load_index_from_storage
import json
import datetime
from flask import request
import logging
import logging.config
from functools import wraps

logging.config.fileConfig('logging.conf', disable_existing_loggers=False)

def log_request(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # logger.info(f'Request: {request.method} {request.path}')
        # return func(*args, **kwargs)
        request_data = {
            'request_method': request.method,
            'request_path': request.path,
            'request_headers': dict(request.headers),
            # 'request_data': request.get_data().decode('utf-8')
        }
        logger.info(json.dumps(request_data))
        return func(*args, **kwargs)
    return wrapper

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://prashantjain:prashantjain@localhost/spe_project'
app.config['JWT_SECRET_KEY'] = 'C2154BF222A336473C81B11EA2DB5C2154BF222A336473C81B11EA2DB5C2154BF222A336473C81B11EA2DB5'
app.config['DATA_DIR'] = 'data'
app.config['STORAGE_DIR'] = 'storage'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(hours=3)
db = SQLAlchemy(app)
jwt = JWTManager(app)
logger = logging.getLogger('flask_app')
migrate = Migrate(app, db)
load_dotenv()
os.environ['OPENAI_API_KEY'] = os.getenv("OPENAI_API_KEY")

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)

@app.route('/register', methods=['POST'])
@log_request
def register():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'message': 'Username already exists'}), 409

    new_user = User(username=username, password=generate_password_hash(password))
    db.session.add(new_user)
    db.session.commit()

    user_dir = os.path.join(app.config['DATA_DIR'], username)
    os.makedirs(user_dir, exist_ok=True)
    user_storage_dir = os.path.join(app.config['STORAGE_DIR'], username)
    os.makedirs(user_storage_dir, exist_ok=True)

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
@log_request
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=user.username)
    return jsonify({'access_token': access_token}), 200
