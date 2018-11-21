import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    FlatList,
    TouchableHighlight,
    StyleSheet,
    Alert
} from 'react-native';
import { colors, padding } from './_base';
import LoaderComponent from './common/LoaderComponent';
import NewsSummaryComponent from './NewsSummaryComponent';

export default class NewsListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
            page: props.page || 1,
            limit: props.limit || 3,
            noMore: props.disableInfiniteScroll || false
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const { data, page, limit, noMore } = this.state;
        // const { id } = this.props;
        const country = 'us';
        const apiKey = '117db645f6774006a1f9484d229d1d65';

        this.setState({ loading: true }, () => {
            fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`)
            .then( response => response.json() )
            .then( updatedData => {
                // console.log(updatedData.articles);
                this.setState({
                    // data: [...data, ...updatedData.articles],
                    data: updatedData.articles,
                    noMore: noMore || updatedData.articles.length < limit
                });
                console.log('data', this.state.data);
            } )
            // .then( updatedData => this.setState({
            //     data: [...data, ...updatedData],
            //     noMore: noMore || updatedData.length < limit
            // }) )
            .catch( err => Alert.alert('Oh snap!', 'Something went wrong!') )
            .finally( () => this.setState({ loading: false, refreshing: false }))
        })
    }

    loadMore() {
        const { page, loading, noMore } = this.state;
        if (loading || noMore) return;
        this.setState({ page: page + 1 }, () => this.getData());
    }

    handleRefresh() {
        this.setState({ refreshing: true }, () => this.getData());
    }

    render() {
        const { data, loading } = this.state; 
        const { onNewsSelect } = this.props; 
        return (
            <View>
                <FlatList
                    data={ data }
                    keyExtractor={ (item, index) => `${index}` }
                    renderItem={ ({item}) => 
                        <TouchableHighlight 
                            underlayColor={ colors.primary }
                            style={ styles.listItem }
                            onPress={ onNewsSelect.bind(this, item.id) }
                        >
                            <NewsSummaryComponent
                                newsItem={ item }
                            />
                        </TouchableHighlight>
                    }
                    onEndReached={ this.loadMore.bind(this) }
                    refreshing={ this.state.refreshing }
                    onRefresh={ this.handleRefresh.bind(this) }
                    onEndReachedThreshold={ 0.01 }
                    ListFooterComponent={ <LoaderComponent isLoading={ loading } /> }
                />
            </View>
        )
    }
}

NewsListComponent.propTypes = {
    id: PropTypes.string.isRequired,
    limit: PropTypes.number,
    page: PropTypes.number,
    disableInfiniteScroll: PropTypes.bool,
    onNewsSelect: PropTypes.func
};

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        padding: padding.md,
        backgroundColor: colors.background
    }
});