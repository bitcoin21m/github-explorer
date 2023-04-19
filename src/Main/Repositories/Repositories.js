import List from '../../ComponentLibrary/List/List';
import ListItem from '../../ComponentLibrary/List/ListItem';
import styles from './Repositories.module.css';
import Badge from '../../ComponentLibrary/Badge/Badge';
import { useMemo } from 'react';

const Repositories = (props) => {
    // props
    const { repos } = props;

    // cycles through the repos and calculates the percentage use of the languages
    const langList = useMemo(() => {
        repos?.forEach(repo => {
            let langPercentages = {};
            let sum = Object.values(repo.languageList).reduce((prev, current) => prev + current, 0);
            Object.keys(repo.languageList).forEach(k => {
                langPercentages[k] = ((repo.languageList[k]/sum)*100)?.toFixed(2);
            });

            let entries = Object.entries(langPercentages);
            repo.languagePercentages = entries.sort((a,b) => {return b[1] - a[1]})?.slice(0,4);
        })
    }, []);

    // click handler for navigating to the repo
    const clickHandler = (e, repo) => window.open(repo.html_url, '_blank');

    return (
        <div className={styles.wrapper}>
            <List>
                { repos?.map((repo) => {
                    return <ListItem
                        clickHandler={(e) => clickHandler(e, repo)}
                        key={repo.name}
                    >
                        <Badge 
                            text={repo.stargazers_count.toLocaleString("en-US")} 
                            className={styles['stars-badge']} 
                            title={'Stars'} 
                            type={'warning'}
                        />
                        <p className={styles.name}>{repo.name}</p>
                        <p className={styles.description}>{repo.description}</p>
                        <div className={styles['lang-list']}>
                          {
                            repo?.languagePercentages?.map(kvp => {
                                return (
                                    <Badge 
                                        key={kvp[0]}
                                        text={kvp[0]}
                                        title={`${kvp[1]}%`}
                                        className={styles['lang-list-item']} 
                                        type={'default'}
                                    />
                                )
                            })
                          }  
                        </div>
                    </ListItem>
                }) }
            </List>
        </div>
    );
};

export default Repositories;
