How it works:
===

Coming in from the server:
```html
<main>
    <template ooml-class="Comments">
        <article class="comments-section">
            <h1>Welcome {{ user.name }}!</h1>
            <span>Catch up on all the gossip about {{ this.celebrity }} in {{ this.category }}</span>
            <ul class="comments-list">
                { for Comment of this.comments }
            </ul>
            <div class="texteditor-container">
                { CKEditor.class this.myComment }
            </div>
        </article>
    </template>

    <template ooml-class="Comment">
        <li class="comment">
            <h2>{{ this.title }}</h2>
            <p>{{ this.comment }}</p>
            <a href="/profiles/{{ this.authorProfile }}" rel="author">{{ this.authorName }}</a>
            <button class="comment-button-report button-style-1" onclick="this.reportComment();">Flag as inappropriate</button>
        </li>
    </template>
</main>

<script src="https://cdn.internet.com/ckeditor/v3/ckeditor-v3-ooml.js"></script>

<article ooml-instantiate="Comment commentSection1">
    {
        articleId: 213
    }
</article>
<article ooml-instantiate="Comment commentSection2">
    {
        articleId: 214
    }
</article>

<script>
    var globals = {
            CKEditor: { class: ckeditor.oomlClass },
            user: USER_DATA,
        };
    
    let ooml = OOML.init({ globals: globals }),
        { classes } = ooml,
        { commentSection1, commentSection2 } = ooml.objects;
    
    for (let commentSection of ooml.objects) {
        Promise.all([
            fetch(`//rest.api.com/article/${commentSection.data.articleId}/details`), // { celebrity: 'Jane Doe', category: 'Movies' }
            fetch(`//rest.api.com/article/${commentSection.data.articleId}/comments`), // [{ title: 'My opinion', comment: 'I liked it', ...} ...]
        ])
            .then(reqs => Promise.all(reqs.map(req => req.json())))
            .then(data => commentSection.oomlAssign(data[0], { comments: data[1] }));
    }

    commentSection1.oomlToJSON().stream(fetch('//rest.api.com/article/213/comments', { method: 'PUT' }));
</script>
```