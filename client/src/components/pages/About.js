import React, { Component } from 'react';
import cookie from 'react-cookies'
import jwt from 'jsonwebtoken';
import Permission from '../Authen/Permission'
class About extends Component {

    render() {
        let token = cookie.load('token');

        let payload = jwt.decode(token);
        let claims = payload.claims;
        let canRead = claims.indexOf(Permission.Role.Read) >= 0;
        console.log('canred', canRead)
        return (
            <div>
                {
                    canRead ?
                        <div>
                            <img src="https://thewallpaper.co//wp-content/uploads/2016/01preview/hd-desktop-images-large-wallpapers-windows-backgrounds-plants-organic-widescreen-images-nature-wall-texture-amazing-views-1400x760.jpg" alt="ảnh" title="ảnh" />

                        </div>
                        : <h1>Mày đéo có quyền vào đây</h1>
                }
            </div>
        );


    }
}

export default About;