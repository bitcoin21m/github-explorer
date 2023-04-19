import { useContext, useEffect, useState } from "react";
import Input from "../ComponentLibrary/Input/Input";
import styles from './Main.module.css';
import Button from "../ComponentLibrary/Button/Button";
import { API } from '../Middleware/middleware';
import { ctx } from "../App";
import Description from "./Description/Description";
import Repositories from "./Repositories/Repositories";
import Errors from "../ComponentLibrary/Errors/Errors";
import { TITLE_WELCOME, EMPTY_STRING } from '../Helpers/Constants';

const Main = () => {
    // states
    const [organization, setOrganization] = useState(null);
    const [repositories, setRepositories] = useState(null);
    const [searchValue, setSearchValue] = useState(EMPTY_STRING);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [error, setError] = useState(null);

    // context
    const { 
        setLoader, 
        loader,
    } = useContext(ctx);

    // initiaties the calls
    const searchHandler = async () => {
        const orgResult = await API.getOrganization(searchValue, { setLoader, absolutePath: false, paginated: false });
        if(!orgResult?.message) setOrganization(orgResult);
        else setError({
            message: orgResult.message
        })
    };

    // input handler to determine whether or not the search button is disabled or active
    const changeHandler = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        setBtnDisabled(value?.length === 0);
    };

    // handler for detecting enter key on input
    const submitHandler = (e) => e.key === 'Enter' && searchValue?.length > 0 && searchHandler();

    // once we get an update to the organization, re-grab the repos
    useEffect(() => {
        const repos = async () => {
            setRepositories(await API.getRepositories(organization.repos_url, { setLoader }));
        };
        organization && repos();

        // clean up states
        return () => {
            setError(null);
        }
    }, [organization]);

    return (
        <div className={styles.wrapper}>
             <div className={styles['search-wrapper']}>
                <p className={styles.welcomeTitle}>{TITLE_WELCOME}</p>
                <div className={styles.searchBoxWrapper}>
                    <Input 
                        type={'text'} 
                        size={'xlg'} 
                        placeholder={'Search for a username'}
                        changeHandler={changeHandler}
                        submitHandler={submitHandler}
                    />
                    <Button 
                        type={'button'} 
                        name={'Search'}
                        disabled={btnDisabled}
                        clickHandler={searchValue ? searchHandler : null}
                    />
                </div>
            </div>
            {
                (organization && repositories && !loader && !error) &&
                <div className={styles['main-content-flex-box']}>
                    <Description organization={organization} />
                    <Repositories 
                        repos={repositories} 
                    />
                </div>
            }
            {
                (error && !loader) && <Errors message={error.message} />
            }
        </div>
    );
};

export default Main;
