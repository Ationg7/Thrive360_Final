function Landing() {
    return (
        <section className="hero d-flex align-items-center justify-content-center text-start p-5">
            <div className="containers">
                <div className="row align-items-center">
                    {/* Left Section - Text */}
                    <div className="col-md-6 text-white">
                    <h1 className="Caption" style={{ color: "white" }}>
    Develop your <br />
    courage to heal, <br />
    and strength to grow
</h1>

    
    <p className="mt-3 fs-5">
        Your personal companion on the journey to a healthier, happier, and more balanced life.<br />
        With Thrive360, you’re not just surviving college life—you’re thriving in every aspect.<br />
        Whether you're looking to boost your energy, find inner peace, <br />
        or build lifelong wellness habits, we've got you covered.
    </p>
    
    <p className="mt-2 fs-5">
        Your well-being matters. Start your Thrive360 journey today!
    </p>
    
    <button className="btn btn-outline-success mt-3">
        <a href="/SignIn" className="text-decoration-none text-white">Join now</a>
    </button>
</div>

                    {/* Right Section - Image */}
                    <div className="col-md-6 text-center position-relative">
    <div className="circle-border"></div>  {/* Dashed border */}
    <div className="circle-spacing"></div>  {/* Space/gap */}
    <div className="circle-bg"></div>       {/* Inner solid circle */}
    <img src="https://www.groupiso.com/wp-content/uploads/2023/02/woman-laughing-on-phone.png" className="hero-img" />
</div>

                </div> 
            </div>
        </section>
    );
}

export default Landing;