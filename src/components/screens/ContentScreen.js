import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import NewsContentComponent from '../NewsContentComponent';
import LoaderComponent from '../common/LoaderComponent';
import { colors } from '../_base';

export default class ContentScreen extends Component {
    static navigationOptions = {
        title: 'In Details',
        headerTintColor: colors.secondaryBackground,
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTitleStyle: {
            flex: 1
        }
    }

    constructor(props) {
        super(props);
        this.state= {
            loading: true
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const country = 'in';
        const apiKey = '117db645f6774006a1f9484d229d1d65';
        const { navigation } = this.props;

        fetch(`https://newsapi.org/v2/top-headlines?country=${country}&q=${navigation.state.params.title}&apiKey=${apiKey}`)
        .then( response => response.json() )
        .then( data => this.setState({
            data: data.articles
        }) )
        .catch( err => Alert.alert('Oh snap! Something went wrong!') )
        .finally( () => this.setState({loading: false}));
    }
    
    render() {
        let { loading, data } = this.state;
        return loading ? <LoaderComponent isLoading={true} /> : (
            <View style={styles.container}>
                <NewsContentComponent
                    newsContent={ data }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondaryBackground
    }
});
