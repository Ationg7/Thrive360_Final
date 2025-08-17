
import { Link } from "react-router-dom";
function NavigationBar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary sticky-top">
                <div className="container-fluid">
                <img src="https://scontent.fceb1-3.fna.fbcdn.net/v/t1.15752-9/477651124_1411857203130583_7234805112764533203_n.png?_nc_cat=103&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeEV-3btlmP-xmNGZml140my0gr776leeh3SCvvvqV56HYsbvWZn3fEASuTwWBDnDZfOqDkET_u56gfiwVzdxUm9&_nc_ohc=7_M4-s6ZxA8Q7kNvgFjHjjz&_nc_oc=AdigbvUL9lACp_9qlGO4ykZXvj1Kgf__Z2u4uisz-_NvYufr4grcp4zijSs1oM-ixXI&_nc_zt=23&_nc_ht=scontent.fceb1-3.fna&oh=03_Q7cD1gGiqEuwu1ZnKPhGTTpw1muXTKyCpBJG95z_MGk8-QOi5w&oe=67ECD5AE"width="70" height="70" />
                <span className="ms-2 fw-bold text-white">Thrive360</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link to="/Home" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/FreedomWall" className="nav-link">FreedomWall</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/WellnessBlog" className="nav-link">WellnessBlog</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/Meditation" className="nav-link">Meditation</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/Challenges" className="nav-link">Challenges</Link>
                        </li>
                        </ul>
                        <form className="d-flex">
                       
                       
                        <Link to="/Profile">
                                <img 
                                    src="https://scontent.fceb1-2.fna.fbcdn.net/v/t1.15752-9/481444257_2055183788319796_7860217918133292027_n.png?_nc_cat=100&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeEpgTsHxwE7GWyAcgo39WpKMAgf0pnHHacwCB_Smccdp-sqhE8EZIyoYqqAR4KYNme5zcZ3ypVvDjxktYhdVsih&_nc_ohc=VxIpWlQ0EnQQ7kNvgGykdj8&_nc_oc=Adlqbj542Aju-J44BaIVJwvaVJrpcQxTiEeLGPUDs29VYNn9Z_F9ICZnsb0rJiNLz5k&_nc_ad=z-m&_nc_cid=1119&_nc_zt=23&_nc_ht=scontent.fceb1-2.fna&oh=03_Q7cD1wFyyO_Co0HIgKyPuh83RVeWaDW0X81PmMI4X-65G9-mlw&oe=680F4FAB"  // Replace with your profile image URL
                                    alt="Profile"
                                    width="60"
                                    height="60"
                                    className="rounded-circle"
                                    style={{ cursor: "pointer" }}
                                />
                                
                            </Link>
                            <button className="btn btn-outline-success" type="submit">
  <Link to="/Signin" style={{ textDecoration: "none", color: "inherit" }}>Logout</Link>
</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavigationBar;