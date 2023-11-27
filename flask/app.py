from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_pymongo import PyMongo
import resend

resend.api_key = "re_dWBpLb7w_CYrAjyhVpTqfB1LTEkAne7fG"

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

@app.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    user = mongo.db.users.find_one({'email': email})
    if user:
        reset_token = create_access_token(identity=str(user["_id"]), expires_delta=False)
        reset_link = f'http://locahost:8080/{reset_token}'
        r = resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": email,
            "subject": "Password Reset",
            "text": f"Click on the link to reset your password: {reset_link}"
        })
        return jsonify({"message": "Email sent with instructions to reset your password"}), 200
    else:
        return jsonify({"message": "User not found"}), 404
    
if __name__ == "__main__":
    app.run(debug=True, port=8080)

    