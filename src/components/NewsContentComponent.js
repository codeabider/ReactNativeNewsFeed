import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Linking,
    Alert
} from 'react-native';
import { colors, padding, fonts } from './_base';

const NewsContentComponent = (props) => {
    // Title, Image, Author, Source, Content, Published on, Link to the content
    const { title, urlToImage, author, source , content, publishedAt, url } = props.newsContent;
    // console.log('props: ', props.newsContent);
    // console.log('props: ',props.newsContent[0], title, urlToImage, author, source , content, publishedAt, url);
    return (
        <View style={styles.summaryContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.newsTitleText}>{ title }</Text>
            </View>

            <View style={styles.contentImage}>
                {urlToImage ? <Image
                    style={{flex: 1, width: 300, maxWidth: 500}}
                    source={{uri: urlToImage}}
                    resizeMode='contain'
                />:
                <Image
                    style={{flex: 1, width: 300, maxWidth: 500}}
                    source={require('./image/featuredimage.jpg')}
                    resizeMode='contain'
                />}
            </View>

            <View style={styles.newsSourceContainer}>
                <Text style={styles.newsSource}><Text style={styles.label}>Author:</Text> { author ? author : 'Unknown' }</Text>
                <Text style={styles.newsSource}><Text style={styles.label}>Source:</Text> { source.name }</Text>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.contentText}>{ content }</Text>
            </View>

            <View style={styles.footerContainer}>
                <Text style={styles.footerText}><Text style={styles.label}>Published:</Text> { publishedAt }</Text>
                <Text 
                    style={styles.footerText}
                    onPress={() => { 
                        Linking.openURL(url)
                        .catch(err => {
                            Alert.alert('Something went wrong!')
                    })
                }}><Text style={styles.label}>More:</Text> { url.length > 80 ? `${url.substr(0, 80)}...` : url }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold'
    },
    summaryContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.secondary,
        padding: padding.sm
    },
    titleContainer: {
        // flex: 2
    },
    newsTitleText: {
        fontWeight: 'bold',
        fontSize: fonts.lg,
        color: colors.textWhite
    },
    contentImage: {
        flex: 3,
        marginTop: padding.md,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    newsSourceContainer: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row'
    },
    newsSource: {
        flex: 1,
        fontSize: fonts.sm,
        color: colors.secondaryBackground,
        marginTop: padding.sm
    },
    contentContainer: {
        flex: 3,
        alignSelf: 'stretch',
        flexDirection: 'column',
        marginTop: padding.md
        // alignItems: 'center'
    },
    contentText: {
        color: colors.textWhite,
        fontSize: fonts.md
    },
    footerContainer: {
        // flex: 2,
        marginTop: padding.sm
    },
    footerText: {
        fontSize: fonts.sm,
        color: colors.secondaryBackground
    }
});

export default NewsContentComponent;