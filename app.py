import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/Opioid_OD.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
National = Base.classes.national
State = Base.classes.state

##########
# HOME PAGE 
##########
@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/index.html")
def home():
    """Return the homepage."""
    return render_template("index.html")
##########
# API DATA
##########
# National Data
@app.route("/api/national_data")

def nationaldata():

    sel = [
        National.year,
        National.Total_OD_Deaths,
        National.OD_Death_Rate,
        National.M_TotalOverdoses,
        National.F_TotalOverdoses,
    ]

    # these results are for chart 1
    results = db.session.query(*sel).order_by(National.year).all()

    # Create a dictionary entry for each row of data information
    OD_data = {}
   
    OD_data["year"]  = [result[0] for result in results]
    OD_data["Total_OD_deaths"] = [result[1] for result in results]
    OD_data["OD_DR"] = [result[2] for result in results]
    OD_data["M_Total_Overdoses"] = [result[3] for result in results]
    OD_data["F_Total_Overdoses"] = [result[4] for result in results]

    print(OD_data)
    return jsonify(OD_data)
	
#State data
@app.route("/api/state_data")

def statedata():

	sel = [
		State.ID,
		State.year,
		State.state,
		State.rate,
		State.deaths
	]

	# these results are for chart 1
	results = db.session.query(*sel).all()

	# Create a dictionary entry for each row of data information
	Rate_data = {}

	Rate_data["ID"]  = [result[0] for result in results]
	Rate_data["year"]  = [result[1] for result in results]
	Rate_data["state"]  = [result[2] for result in results]
	Rate_data["rate"]  = [result[3] for result in results]
	Rate_data["deaths"]  = [result[4] for result in results]

	#print(OD_data)
	return jsonify(Rate_data)

# Opioid Data
@app.route("/api/opioid_data")

def data2():

    sel = [
        National.year,
        National.Any_Opiod_DR,
        National.Prescr_Opiods_DR,
        National.Heroin_DR,
        National.Fentanyl_DR,
        National.Both_Opiods,
        National.Both_Prescr_Opiods,
        National.Both_Heroin,
        National.Both_Fentanyl,
        National.Both_Opium_Other,
        National.M_Opiods,
        National.M_Prescr_Opiods,
        National.M_Heroin,
        National.M_Fentanyl,
        National.M_Opium_Other,
        National.F_Opiods,
        National.F_Prescr_Opiods,
        National.F_Heroin,
        National.F_Fentanyl,
        National.F_Opium_Other
    ]

    # These results are for chart 2 - US Opioid Related Overdose Deaths vs Opioid Related Overdose Death Rates
    results = db.session.query(*sel).order_by(National.year).all()
    #console(print "results")
    # Create a dictionary entry for each row of data information
    OP_data = {}
   
    OP_data["year"]  = [result[0] for result in results]
    OP_data["Any_Opiod_DR"] = [result[1] for result in results]
    OP_data["Prescr_Opiods_DR"] = [result[2] for result in results]
    OP_data["Heroin_DR"] = [result[3] for result in results]
    OP_data["Fentanyl_DR"] = [result[4] for result in results]
    OP_data["Both_Opiods"] = [result[5] for result in results]
    OP_data["Both_Prescr_Opiods"] = [result[6] for result in results]
    OP_data["Both_Heroin"] = [result[7] for result in results]
    OP_data["Both_Fentanyl"] = [result[8] for result in results]
    OP_data["Both_Opium_Other"] = [result[9] for result in results]
    OP_data["M_Opiods"] = [result[10] for result in results]
    OP_data["M_Prescr_Opiods"] = [result[11] for result in results]
    OP_data["M_Heroin"] = [result[12] for result in results]
    OP_data["M_Fentanyl"] = [result[13] for result in results]
    OP_data["M_Opium_Other"] = [result[14] for result in results]
    OP_data["F_Opiods"] = [result[15] for result in results]
    OP_data["F_Prescr_Opiods"] = [result[16] for result in results]
    OP_data["F_Heroin"] = [result[17] for result in results]
    OP_data["F_Fentanyl"] = [result[18] for result in results]
    OP_data["F_Opium_Other"] = [result[19] for result in results]
    
    print(OP_data)
    return jsonify(OP_data)

##########
# VISUALIZATIONS
##########
@app.route("/US_OD.html")
def build_OD_Chart():
    """Return the US_OD page."""
    return render_template("US_OD.html")	
	
@app.route("/US_OP.html")
def build_OP_Chart():
    """Return the US_OP page."""
    return render_template("US_OP.html")	
	
@app.route("/states_map.html")
def buildMap():
    """Return the states_map page."""
    return render_template("states_map.html")

@app.route("/Database.html")
def rawData():
    """Return the states_map page."""
    return render_template("Database.html")		

if __name__ == "__main__":
    app.run(debug=True)