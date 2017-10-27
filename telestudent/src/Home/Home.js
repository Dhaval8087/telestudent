import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Datastore from 'nedb';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    componentDidMount() {
       
        var users = new Datastore({ filename: 'users.db', autoload: true });
        var scott = {
            name: 'Scott',
            twitter: '@ScottWRobinson'
        };

         users.insert(scott, function(err, doc) {  
             console.log('Inserted', doc.name, 'with ID', doc._id);
         });
        users.find({}).sort({ name: 1 }).exec(function (err, docs) {
            docs.forEach(function (d) {
                this.state.users.push(d.name);
            }.bind(this));
            this.setState({});
        }.bind(this));
        
    }

    render() {
        console.log(this.state.users)
        return (
            <div>
                {
                    this.state.users.map(item => {
                        return (
                            <span> {item}</span>
                        )
                    })
                }
            </div>
        );
    }
}
Home.contextTypes = {
    router: PropTypes.object.isRequired
};
export default Home;