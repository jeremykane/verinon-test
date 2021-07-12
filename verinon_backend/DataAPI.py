import sys
from flask import Blueprint, jsonify, request
import json
# Imports the Google Cloud client library
from google.cloud import datastore

# Instantiates a client for datastore
client = datastore.Client()

# Kind of the entity
kind = 'Data'

data_api = Blueprint('data_api', __name__)

@data_api.route('/get-data', methods=['GET'])
def getData():
    query = client.query(kind=kind)
    data = list(query.fetch())

    if len(data) > 0:
        return jsonify(data), 200
    return jsonify({}), 404

    # return jsonify({}), 200

@data_api.route('/populate', methods=['GET'])
def populateData():
    
    json_data = open('./MOCK_DATA.json')
    data = json.load(json_data)

    for x in data:
        entity = datastore.Entity(key=client.key('Data',x['id']))
        entity.update(x)
        client.put(entity)

    return jsonify(data),200

@data_api.route('/filter-data', methods=['POST'])
def filter_data():
    filter1 = request.get_json()['filter1'].lower()
    filter2 = request.get_json()['filter2'].lower()
    # filter1 = ''
    # filter2 = 'male'
    filteredData = []
    query = client.query(kind=kind)
    data = list(query.fetch())

    for x in data:
        if filter1 in x['email'].lower() \
        or filter1 in x['first_name'].lower() \
        or filter1 in x['last_name'].lower() \
        or filter1 in x['gender'].lower() \
        or filter1 in str(x['ip_address']).lower() \
        or filter1 in str(x['id']).lower():
            if filter2 in x['email'].lower() \
            or filter2 in x['first_name'].lower() \
            or filter2 in x['last_name'].lower() \
            or filter2 in x['gender'].lower() \
            or filter2 in str(x['ip_address']).lower() \
            or filter2 in str(x['id']).lower():
                filteredData.append(x)

    return jsonify(filteredData),200

@data_api.route('/count-chart-data', methods=['POST'])
def countGender():
    data = request.get_json()['data']
    chartData = {
        'male': 0,
        'female': 0,
        'polygender': 0,
        'agender': 0,
        'bigender': 0,
        'genderfluid': 0,
        'genderqueer': 0,
        'nonbinary': 0
    }
    for x in data:
        # print(x['gender'].lower() == 'male')
        # print(data.)
        if x['gender'].lower() in 'male':
            chartData['male'] += 1
        elif x['gender'].lower() in 'female':
            chartData['female'] += 1
        elif x['gender'].lower() in 'polygender':
            chartData['polygender'] += 1
        elif x['gender'].lower() in 'agender':
            chartData['agender'] += 1
        elif x['gender'].lower() in 'bigender':
            chartData['bigender'] += 1
        elif x['gender'].lower() in 'genderfluid':
            chartData['genderfluid'] += 1
        elif x['gender'].lower() in 'genderqueer':
            chartData['genderqueer'] += 1
        elif x['gender'].lower() in 'non-binary':
            chartData['nonbinary'] += 1

    return jsonify(chartData),200


