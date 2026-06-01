"""
VisioClinical AI — Flask company website.
Run locally: python app.py
Production (Render): gunicorn app:app
"""

from flask import Flask, render_template

app = Flask(__name__)

# ---------------------------------------------------------------------------
# Graphics filenames (static/graphics/) — change here if you rename assets
# ---------------------------------------------------------------------------
ASSETS = {
    "logo": "Logo_VCAI_blue.png",
    "logo_footer": "Logo_VCAI_white.png",
    "hero": "HeroImage_VCAI.png",
    "favicon": "Favicon_VCAI.png",
}

SITE = {
    "name": "VisioClinical AI",
    "tagline": "AI that captures what clinicians need to see",
    "email": "david.brogan@visioclinicalai.com",
    "address": "117 S Lexington Street Ste 100, Harrisonville, MO 64701 US",
}


@app.context_processor
def inject_globals():
    """Make assets and site info available in every template."""
    return {"assets": ASSETS, "site": SITE}


@app.route("/")
def index():
    return render_template(
        "index.html",
        title="VisioClinical AI | Clinical Vision for Virtual Care",
        meta_description=(
            "VisioClinical AI helps physicians document objective physical-exam data in clinic "
            "and support remote monitoring with camera-based clinical assessment tools."
        ),
    )


@app.route("/about")
def about():
    return render_template(
        "about.html",
        title="About Us | VisioClinical AI",
        meta_description=(
            "Learn how VisioClinical AI makes remote physical examination objective, "
            "accessible, and scalable for every care setting."
        ),
    )


@app.route("/faq")
def faq():
    return render_template(
        "faq.html",
        title="FAQ | VisioClinical AI",
        meta_description=(
            "Frequently asked questions about VisioClinical AI, ArmorMed, WoundGuard, "
            "TremorTrack, and camera-based clinical assessment."
        ),
    )


@app.route("/contact")
def contact():
    return render_template(
        "contact.html",
        title="Contact | VisioClinical AI",
        meta_description=(
            "Contact VisioClinical AI to learn more about camera-based clinical "
            "assessment for virtual care."
        ),
    )


if __name__ == "__main__":
    app.run(debug=True)
