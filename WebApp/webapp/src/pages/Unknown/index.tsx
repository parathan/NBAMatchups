import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import styles from './index.module.css';

/**
 * The Unknown component returns a page that indicates that the user visited a page that does not exist.
 * It will then redirect the user to the home page. It's purpose is for navigation for unknown routes.
 */
function Unknown() {

    const navigate = useNavigate();

    function handleNavigate(route: string) {
        navigate(route)
    }

    return(
        <Layout>
            <header className={styles.header}>
                <p>
                    404 Error Page
                </p>
            </header>
            <div className={styles.description}>
                Uh Oh! Nothing here
            </div>
            <button className={styles.featureButton} onClick={() => handleNavigate("/")}>
                Go Home
            </button>
        </Layout>
    )
}

export default Unknown;