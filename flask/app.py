from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_pymongo import PyMongo
import resend

resend.api_key = "re_BAWG9Xe9_NMeoa7c9ULB4q8tu6oGPg8Aw"
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

@app.route('/reset-password', methods=['POST'])
def reset_password():
    tokens = mongo.db.tokens 
    data = request.json
    email = data.get('email')
    user = mongo.db.users.find_one({'email': email})
    if user:
        reset_token = create_access_token(identity=str(user["_id"]), expires_delta=False)
        reset = {'email': email, 'token': reset_token}
        tokens.insert_one(reset)
        reset_link = f'http://localhost:3000/update-senha?token={reset_token}'
        r = resend.Emails.send({
            "from": "Jonasbp <jonas@mail.jonasbp.com>",
            "to": email,
            "subject": "Redefinição de senha",
            "text": f"Você está recebendo esse email porque você ou alguém solicitou um link para redefinição de senha da sua conta. Caso você não tenha solicitado nada, esse email pode ser ignorado. Clique no link abaixo para redefinir a sua senha:\n{reset_link}"
        })
        return jsonify({"message": "Email sent with instructions to reset your password"}), 200
    else:
        return jsonify({"message": "User not found"}), 404

@app.route('/update-senha', methods=['PUT'])
def update_senha():
    try:
        data = request.json
        token = data.get('token')
        hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
        banco_token = mongo.db.tokens.find_one({'token': token})
        if banco_token and banco_token['token'] == token:
            mongo.db.users.update_one({'email': banco_token['email']}, {'$set': {'password': hashed_password}})
            mongo.db.tokens.delete_one({'token': token})
        return jsonify({"message": "Senha alterada com sucesso!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(debug=True, port=8080)

    