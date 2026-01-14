from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from datetime import datetime, timedelta
from werkzeug.utils import secure_filename

app = Flask(__name__)

MONGODB_CONNECTION_STRING = "mongodb+srv://test:sparta@cluster0.9xken9a.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
client = MongoClient(MONGODB_CONNECTION_STRING)
db = client.dbporto


from bson.objectid import ObjectId

@app.route('/', methods=['GET'])
def home():
    dataproject = list(db.projects.find({},{}))
    for data in dataproject:
        data['_id'] = str(data['_id'])
    
    # db.projects.update_one({'prjid':'prjweb-32417'}, {'$set':{'url':'dejourney-id.glitch.me'}})

    return render_template('index.html', porto = dataproject)


@app.route('/admin', methods=['GET'])
def admin():
    dataproject = list(db.projects.find({},{}))
    for data in dataproject:
        data['_id'] = str(data['_id'])
    return render_template('admin.html', porto=dataproject)


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

    mainfile_path = ""
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

@app.route("/update", methods=["POST"])
def update():
    oid = request.form["oid"]
    id = request.form["id"]
    title = request.form["title"]
    type = request.form["type"]
    desk1 = request.form["desk1"]
    url = request.form["url"]
    deskripsi = request.form["deskripsi"]
    # File handling for update can be tricky if not re-uploading, 
    # but for now let's assume loose update or user sends what's needed.
    # To keep it simple, we update text fields first.
    
    update_fields = {
        "prjid": id,
        "type": type,
        "title": title,
        "desk1": desk1,
        "url": url,
        "deskripsi": deskripsi,
    }

    if "filemain" in request.files and request.files["filemain"].filename != "":
        time = datetime.now().strftime("%m%d%H%M%S")
        file = request.files["filemain"]
        filename = secure_filename(file.filename)
        extension = filename.split(".")[-1]
        mainfile_path = f"mainimage/{id}-mainimage-{time}.{extension}"
        file.save("./static/assets/" + mainfile_path)
        update_fields["mainimage"] = mainfile_path

    # Handle multiple images if needed (careful with overwriting existing logic)
    if "filelength" in request.form:
        filelength = int(request.form["filelength"])
        for i in range(filelength):
             if f'file[{i}]' in request.files:
                time = datetime.now().strftime("%m%d%H%M%S")
                file = request.files[f'file[{i}]']
                filename = secure_filename(file.filename)
                extension = filename.split(".")[-1]
                file_path = f"carimage/{id}-carimage{i}-{time}.{extension}"
                file.save("./static/assets/" + file_path)
                update_fields[f"image{i}"] = file_path

    db.projects.update_one({'_id': ObjectId(oid)}, {'$set': update_fields})
    return jsonify({"result": "success", "msg": 'Data Berhasil Diupdate!'})

@app.route("/delete", methods=["POST"])
def delete():
    oid = request.form['oid']
    db.projects.delete_one({'_id': ObjectId(oid)})
    return jsonify({"result": "success", "msg": 'Data Berhasil Dihapus!'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
