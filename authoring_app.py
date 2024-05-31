from flask import Flask, send_from_directory, render_template
import logging
from waitress import serve
import os

app = Flask(__name__, static_folder='dist')

# Configure logging
logging.basicConfig(filename='vue_app.log', level=logging.INFO,
                    format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_vue_app(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    logging.info("Starting Vue app with Waitress server...")
    serve(app, host='0.0.0.0', port=8004)
