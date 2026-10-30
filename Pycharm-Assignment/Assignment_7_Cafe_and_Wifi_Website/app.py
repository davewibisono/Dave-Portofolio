from flask import Flask, render_template, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField, BooleanField
from wtforms.validators import DataRequired, URL

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here_change_in_production'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cafes.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- Database Model ---
class Cafe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=True, nullable=False)
    map_url = db.Column(db.String(500), nullable=False)
    img_url = db.Column(db.String(500), nullable=False)
    location = db.Column(db.String(250), nullable=False)
    has_sockets = db.Column(db.Boolean, nullable=False)
    has_toilet = db.Column(db.Boolean, nullable=False)
    has_wifi = db.Column(db.Boolean, nullable=False)
    can_take_calls = db.Column(db.Boolean, nullable=False)
    seats = db.Column(db.String(250), nullable=False)
    coffee_price = db.Column(db.String(250), nullable=False)

# --- Form Definition ---
class CafeForm(FlaskForm):
    name = StringField('Cafe Name', validators=[DataRequired()])
    map_url = StringField('Google Maps URL', validators=[DataRequired(), URL()])
    img_url = StringField('Image URL', validators=[DataRequired(), URL()])
    location = StringField('Location/Neighborhood', validators=[DataRequired()])
    seats = SelectField('Seating Capacity', choices=['0-10', '10-20', '20-50', '50+'], validators=[DataRequired()])
    coffee_price = StringField('Average Coffee Price (e.g. $3.50 or IDR 30k)', validators=[DataRequired()])
    has_sockets = BooleanField('Has Power Sockets?')
    has_toilet = BooleanField('Has Toilets?')
    has_wifi = BooleanField('Has Fast Wifi?')
    can_take_calls = BooleanField('Can Take Phone/Zoom Calls?')
    submit = SubmitField('Add Cafe')

# --- Helper Function: Sample Data Seeding ---
def seed_initial_data():
    if Cafe.query.count() == 0:
        sample_cafes = [
            Cafe(
                name="Nomad Central Coffee",
                map_url="https://maps.google.com",
                img_url="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800",
                location="Downtown",
                has_sockets=True,
                has_toilet=True,
                has_wifi=True,
                can_take_calls=True,
                seats="20-50",
                coffee_price="$4.00"
            ),
            Cafe(
                name="Quiet Corner Cafe",
                map_url="https://maps.google.com",
                img_url="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
                location="West End",
                has_sockets=True,
                has_toilet=True,
                has_wifi=True,
                can_take_calls=False,
                seats="10-20",
                coffee_price="$3.50"
            )
        ]
        db.session.bulk_save_objects(sample_cafes)
        db.session.commit()

# --- Routes ---
@app.route('/')
def home():
    cafes = Cafe.query.all()
    return render_template('index.html', cafes=cafes)

@app.route('/add', methods=['GET', 'POST'])
def add_cafe():
    form = CafeForm()
    if form.validate_on_submit():
        new_cafe = Cafe(
            name=form.name.data,
            map_url=form.map_url.data,
            img_url=form.img_url.data,
            location=form.location.data,
            seats=form.seats.data,
            coffee_price=form.coffee_price.data,
            has_sockets=form.has_sockets.data,
            has_toilet=form.has_toilet.data,
            has_wifi=form.has_wifi.data,
            can_take_calls=form.can_take_calls.data
        )
        db.session.add(new_cafe)
        db.session.commit()
        flash('Successfully added new cafe!', 'success')
        return redirect(url_for('home'))
    return render_template('add.html', form=form)

@app.route('/delete/<int:cafe_id>', methods=['POST'])
def delete_cafe(cafe_id):
    cafe = Cafe.query.get_or_404(cafe_id)
    db.session.delete(cafe)
    db.session.commit()
    flash('Cafe deleted successfully.', 'info')
    return redirect(url_for('home'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        seed_initial_data()
    app.run(debug=True)