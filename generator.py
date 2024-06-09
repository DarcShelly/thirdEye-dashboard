from flask import Flask, jsonify
from flask_cors import CORS
import threading
import time
from numpy import random as rnd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

data = {
    "timestamp": None,
    "value": None
}

def update_data():
    while True:
        data['timestamp'] = time.time()
        data['value'] = rnd.randint(0, 10)
        time.sleep(1)  # Update every 60 seconds

@app.route('/data', methods=['GET'])
def get_data():
    return jsonify(data)

if __name__ == '__main__':
    threading.Thread(target=update_data).start()
    app.run(host='0.0.0.0', port=5000)
