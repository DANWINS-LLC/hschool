from flask import Flask, render_template, send_file
import logging
from logging.handlers import RotatingFileHandler


app = Flask(__name__, template_folder="static/templates")

@app.route("/")
def hello():
    return send_file('static/templates/index.html')


@app.errorhandler(500)
def internal_server_error(e):
    app.logger.debug(e)
    app.logger.debug('echo is anyone there?')
    return render_template('500.html'), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
