import logging
import google
import os

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from AccountAPI import account_api
from DataAPI import data_api

app = Flask(__name__)
CORS(app)


app.register_blueprint(account_api)
app.register_blueprint(data_api)

@app.route('/', methods = ['GET'])
def hello():
    """Return a friendly HTTP greeting."""
    return 'Hello Verinon, Flask is running test!'

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500


if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)