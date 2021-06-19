import React, {useState, useEffect} from 'react';
import styles from './Profile.module.css';
import {useSelector} from 'react-redux';
import Post from '../Posts/Post/Post';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import {Link,useHistory} from 'react-router-dom';
import {Button, CircularProgress, Grid} from '@material-ui/core';
import * as api from '../../api/index';
import FileBase from 'react-file-base64';
import { toast } from 'react-toastify';
import noProfilePhoto from "../../assets/noProfilePhoto.jpg";
import camera from "../../assets/camera.gif"
import * as validator from '../../utils/validator';
import moment from 'moment';

function Profile() {

    const posts = useSelector((state) => state.posts);

    const [id, setId] = useState("");
    const history = useHistory();
    
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [name ,setName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [img, setImg] = useState(noProfilePhoto);
    const [joined, setJoined] = useState("");

    const [newName, setNewName] = useState("");
    const [newBio, setNewBio] = useState("");
    const [newProfile, setNewProfile] = useState(noProfilePhoto);

    useEffect(() => {
        (async () => {
            setLoading(true);
    
            try {
    
                const {data} = await api.verify({token : localStorage.getItem('token')});
                const response = await api.getProfileById(data.id);
                const {name, email, bio, createdOn} = response.data.user;
    
                setName(name);
                setEmail(email);
                setBio(bio);
                setJoined(createdOn);
                setId(data.id);
                setNewName(name);
                setNewBio(bio);
    
                setLoading(false);
            
                const imgResponse = await api.getProfilePhotoById(data.id);
                const { img } = imgResponse.data;
    
                setImg(img);
                setNewProfile(img);
    
            } catch (error) {
                setLoading(false);
                if(error.response) {
                    toast.error(error.response.data.message);
                } else if(error.request) {
                    toast.error("Server is not Responding!");
                } else {
                    toast.error(error.message);
                }
                history.push('/');
            }
        })();
    }, [])

    async function save() {
        if(validator.empty(newName)) {
            return toast.error("Name Field is Empty!");
        }

        try {

            setLoading(true);

            const {data} = await api.updateProfileById(id, {name: newName, bio: newBio, img: newProfile});
            setEditMode(mode => !mode);

            // console.log(data);
            setNewName(data.user.name);
            setNewBio(data.user.bio);
            setNewProfile(data.user.img);

            setName(data.user.name);
            setBio(data.user.bio)
            setImg(data.user.img);

            toast.success(data.message);

        } catch (error) {
            if(error.response) {
                toast.error(error.response.data.message);
            } else if(error.request) {
                toast.error("Server is not Responding!");
            } else {
                toast.error(error.message);
            }
        }
        
        setLoading(false);

    };

    if(loading) {
        return (
          <div className={styles.loadstate}>
            <CircularProgress  color="black"  size = "6rem"  thickness="5"/>
          </div>   
        )
    }


    return (
          <div className={styles.Profile}>
            <Link to='/'>
                <Button aria-controls="simple-menu" aria-haspopup="true" className={styles.back}>
                    <ArrowBackIcon/>
                </Button>
            </Link>
            {
                editMode ?
                <>
                    <Button aria-controls="simple-menu" aria-haspopup="true" className={styles.save}
                        onClick={() => save()}
                    >
                        <SaveIcon/>
                    </Button>
                    <Button aria-controls="simple-menu" aria-haspopup="true" className={styles.close}
                        onClick={() => {
                            setEditMode(mode => !mode)
                            setNewName(name);
                            setNewBio(bio);                            
                            setNewProfile(img);
                        }}
                    >
                        <CloseIcon/>
                    </Button>
                </>
                :
                <Button aria-controls="simple-menu" aria-haspopup="true" className={styles.edit}
                    onClick={() => setEditMode(mode => !mode)}
                >
                    <EditIcon/>
                </Button>
            }
            <div className={styles.photo}>
                {
                    editMode ?
                    <div className={styles.hoverdiv}>
                        <div className={styles.hover_camera}>
                            <img alt="" src={camera} width="200px" height="200px" />
                        </div>
                        <div className={styles.inputFile}>
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={({base64}) =>setNewProfile(base64)} 
                            />
                        </div>
                        <div className={styles.imgDiv}>
                            <img src={newProfile} alt="Preview" className={styles.preview}/>
                        </div>
                    </div>
                    :
                    <img src={img}
                        alt="Not Found"
                        className={styles.profile_img}
                    />
                }
            </div>
            <div className={styles.name}>
                {
                    editMode ?
                        <input type="text" placeholder="Update Name" className={styles.inputs}
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        :
                        <>{name}</>
                }
            </div>
            <div className={styles.email}>
                {email}
            </div>
            <div className={styles.joined}>
                Joined {moment(joined).fromNow()}
            </div>
            <div className={styles.bio}>
                {
                    editMode ?
                        <input type="text" placeholder="Update Bio" className={styles.inputs}
                            value={newBio}
                            onChange={(e) => setNewBio(e.target.value)}
                        />
                        :
                        <>{bio}</>
                }
            </div>
            <div className={styles.posts_title}>
                My Posts
            </div>
            {
                loading ?
                <div><CircularProgress /></div>
                :
                <>
                {
                    posts.length === 0 ?
                    <>You have not posted a Memory till now.</>
                    :
                    <Grid className={styles.postsContainer} container alignItems="stretch" spacing={3}>
                        {
                            posts.reverse().filter((post) => post.creator._id === id).map(post => (
                                <div className={styles.post} key={post._id}>
                                    <Post post={post} fromProfile={true}/>
                                </div>
                            ))
                        }
                    </Grid>
                }
                </>
            }
        </div>
    )
}

export default Profile;
