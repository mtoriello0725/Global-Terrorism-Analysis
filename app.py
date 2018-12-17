import os
import json
from config import *

import pandas as pd
import numpy as np

# Import Flask & pymongo
from flask import Flask, jsonify, render_template, redirect, request
import pymongo

# Start Flask application:
app = Flask(__name__)

# Configue connection to MongoDB.
conn = f"mongodb://{dbuser}:{dbpassword}@ds135724.mlab.com:35724/global_terror"
mongoClient = pymongo.MongoClient(conn)
db = mongoClient.global_terror
col = db["terror_collection"]

##################################################
# Routes leading to templates:
##################################################

@app.route("/")
def index():
    """Return the homepage."""

    return render_template("index.html")

@app.route("/graphs")
def chartDisplay():
	""" Return chartsDisplay page """
	return render_template("graphs.html")

@app.route("/about")
def about():
	""" Return about page """
	return render_template("about.html")

##################################################
# Routes leading to api calls:
##################################################
@app.route("/api/geography")
def geography():

	# query statement for mongo dataset
	query = {"properties":{"year":2017}}
	paramDict = {
	    "_id": False,
	    "type": True,
	    "geometry": True,
	    "properties": True
	    }
	result = col.find(query, paramDict)

	# Append an empty variable with all the queried locations.
	geo2017 = []
	for atk in result: 
		geo2017.append(atk)

	# Return jsonified object.
	return jsonify(geo2017)


if __name__ == "__main__":
    app.run()