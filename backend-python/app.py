from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Dockerized Python App!"

@app.route('/post', methods=['POST'])
def post_example():
    return "post로 POST 요청"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
