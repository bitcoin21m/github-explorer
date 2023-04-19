import Badge from '../../ComponentLibrary/Badge/Badge';
import { addCommasToNumber } from '../../Helpers/HelperFnc';
import styles from './Description.module.css';

const Description = (props) => {
    // props
    const { 
        name, 
        login,
        company,
        location, 
        followers, 
        created_at, 
        bio, 
        avatar_url, 
        public_repos,
        following,
    } = props.organization;

    return (
        <div className={styles.wrapper}>
            <div className={styles['header-wrapper']}>
                <span className={styles['header-title']}>{name || company || login}</span>
                <img src={avatar_url} className={styles['header-image']} />
                <Badge title={'Created Date'} className={styles['header-badge']} type={'default'} text={created_at} />
            </div>
            <div className={styles['description-wrapper']}>
                <p className={styles.bio}>{bio || <span style={{ fontStyle: 'italic' }}>No Bio Found</span>}</p>
                <p className={styles.location}>{location || 'No Location Found'}</p>
                <div className={styles.stats}>
                    <div className={styles['stats-badge-wrapper']}>
                        <span>Public Repos</span>
                        <Badge 
                            className={styles['stats-badge']} 
                            type={'primary'} 
                            text={addCommasToNumber(public_repos)} 
                            title={'Public Repo Count'} 
                        />
                    </div>
                    <div className={styles['stats-badge-wrapper']}>
                        <span>Followers</span>
                        <Badge 
                            className={styles['stats-badge']} 
                            type={'primary'} 
                            text={addCommasToNumber(followers)} 
                            title={'Follower Count'}
                        />
                    </div>
                    <div className={styles['stats-badge-wrapper']}>
                        <span>Following</span>
                        <Badge 
                            className={styles['stats-badge']} 
                            type={'primary'} 
                            text={addCommasToNumber(following)} 
                            title={'Following Count'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Description;