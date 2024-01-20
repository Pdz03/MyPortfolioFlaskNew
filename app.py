from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from datetime import datetime, timedelta
from werkzeug.utils import secure_filename

app = Flask(__name__)

MONGODB_CONNECTION_STRING = "mongodb+srv://test:sparta@cluster0.9xken9a.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
client = MongoClient(MONGODB_CONNECTION_STRING)
db = client.dbporto


@app.route('/', methods=['GET'])
def home():
    dataproject = list(db.projects.find({},{}))
    for data in dataproject:
        data['_id'] = str(data['_id'])
    
    # db.projects.update_one({'prjid':'prjweb-32417'}, {'$set':{'url':'dejourney-id.glitch.me'}})

    return render_template('index.html', porto = dataproject)


@app.route('/admin', methods=['GET'])
def admin():
    return render_template('admin.html')


@app.route('/project/webdev', methods=['GET'])
def project_web():
    dataproject = list(db.projects.find({'type':'webdev'}))
    for data in dataproject:
        data['_id'] = str(data['_id'])
    return render_template('webdev.html', porto = dataproject)


@app.route('/project/graphic', methods=['GET'])
def project_graphic():
    return render_template('graphic.html')

@app.route("/send", methods=["POST"])
def send():
    id = request.form["id"]
    title = request.form["title"]
    type = request.form["type"]
    desk1 = request.form["desk1"]
    url = request.form["url"]
    deskripsi = request.form["deskripsi"]
    filelength = int(request.form["filelength"])

    if "filemain" in request.files:
        time = datetime.now().strftime("%m%d%H%M%S")
        file = request.files["filemain"]
        filename = secure_filename(file.filename)
        extension = filename.split(".")[-1]
        mainfile_path = f"mainimage/{id}-mainimage-{time}.{extension}"
        file.save("./static/assets/" + mainfile_path)

    doc = {
        "prjid": id,
        "type": type,
        "title": title,
        "desk1": desk1,
        "url": url,
        "deskripsi":deskripsi,
        "mainimage":mainfile_path,
        }

    for i in range(filelength):
        time = datetime.now().strftime("%m%d%H%M%S")
        file = request.files[f'file[{i}]']
        filename = secure_filename(file.filename)
        extension = filename.split(".")[-1]
        file_path = f"carimage/{id}-carimage{i}-{time}.{extension}"
        file.save("./static/assets/" + file_path)
        doc[ f"image{i}"] = file_path

    db.projects.insert_one(doc)
    return jsonify({"result": "success", "msg": 'Terkirim!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
