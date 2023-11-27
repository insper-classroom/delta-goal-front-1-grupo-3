from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_pymongo import PyMongo

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb+srv://admin:admin@cluster0.jko03zk.mongodb.net/users"
app.config["JWT_SECRET_KEY"] = "sprint-session-2"
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

@app.route("/register", methods=["POST"])
def register():
    users = mongo.db.users
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    user = {'email': data["email"], 'password': hashed_password}
    try: 
        users.insert_one(user)
        return jsonify({"message": "Usuário criado com sucesso"}), 200
    except:
        return jsonify({"message": "Erro ao criar usuário"}), 500
    
@app.route("/login", methods=["POST"])
def login():
    users = mongo.db.users
    data = request.get_json()
    user = users.find_one({"email": data["email"]})
    if user and bcrypt.check_password_hash(user["password"], data["password"]):
        token = create_access_token(identity=str(user["_id"]))
        return jsonify({"message": 'Login realizado com sucesso',"token": token}), 200
    else:
        return jsonify({"message": "Usuário ou senha inválidos"}), 401
    
@app.route('/auth-endpoint', methods=['GET'])
@jwt_required()
def auth_endpoint():
    current_user = get_jwt_identity()
    return jsonify({'message': 'You are authorized to access me', 'user': current_user}), 200
    
if __name__ == "__main__":
    app.run(debug=True, port=8080)

    