import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# Import Flask
from flask import Flask, jsonify, render_template, redirect, request
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database/global_terrorism.sqlite"

# db = SQLAlchemy(app)

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(db.engine, reflect=True)

"""
To query from sqlite, 
    # Use Pandas to perform the sql query
    stmt = db.session.query(<sample>).statement
    df = pd.read_sql_query(stmt, db.session.bind)
"""
##################################################
# Routes leading to templates:
##################################################

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/about")
def about():
	""" Return about page """
	return render_template("about.html")

@app.route("/chartsDisplay")
def chartDisplay():
	""" Return chartsDisplay page """
	return render_template("chartsDisplay.html")



##################################################
# Routes leading to api calls:
##################################################
@app.route("/api/geography")
def geography():
	""" Return queried data for geographical plot """

	# stmt = db.session.query(<query_statement>).statement
	# df_geo = pd.read_sql_query(stmt, db.session.bind)

	return jsonify(df_geo.to_json(orient="records"))


if __name__ == "__main__":
    app.run()