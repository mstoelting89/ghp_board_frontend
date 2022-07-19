export const getters = {
    getNews: state => state.newsArray,
    getDetailNews: state => state.newsDetailArray,
    getUpdateNews: state => state.newsUpdateArray,
    getDeleteNews: state => state.newsDeleteArray,
    getInsertNews: state => state.newsInsertArray,
    getAttachmentNews: state => state.newsAttachmentArray,
    getNewsMessage: state => state.newsMessageArray
}