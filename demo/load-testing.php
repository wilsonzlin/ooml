<!DOCTYPE html>
<html>

<head>
</head>

<body>
    <main>
        <template ooml-class="Class1">
            <article>
                <h1>Welcome {{ user.name }} {{ user.name }} {{ user.age }} {{ user.name }} {{ user.gender }} {{ user.gender }}!</h1>
                <span>Catch up on all the gossip about {{ this.celebrity }} in {{ this.category }}</span>
                <div>
                    {{ user.age }} is {{ this.gender }}
                    <h1>Why are you bully</h1>
                    <label>{{ user.gender }}</label>
                </div>
                <span>{{ user.age }}</span>
            
                <ul>
                    <li>
                        <h2>{{ this.title }}</h2>
                        <p>{{ this.comment }}</p>
                        <a href="/profiles/{{ this.authorProfile }}" rel="author">{{ this.authorName }}</a>
                        <button class="comment-button-report button-style-1" onclick="this.reportComment();">Flag as inappropriate</button>
                    </li>
                </ul>

                <div>
                    <h1>{{ user.name }} {{ user.age }} {{ user.name }} {{ user.gender }} {{ user.gender }} {{ user.gender }} {{ user.gender }} {{ user.gender }}</h1>
                    <div>{{ this.HTTP }}</div>
                    Persistence Compression HTTPS
                    Request methods
                    OPTIONS GET HEAD POST PUT DELETE TRACE CONNECT PATCH
                    Header fields
                    Cookie ETag Location HTTP referer DNT X-Forwarded-For
                    Status codes
                    301 Moved Permanently 302 Found 303 See Other 403 Forbidden 404 Not Found 451 Unavailable For Legal Reasons
                    v t e
                    <table>
                        <thead>
                            <th>Name</th>
                            <th>Job Title</th>
                            <th>Twitter</th>
                        </thead>
                        <tbody>
                            <tr> 
                                <td>{{ this.person }}</td> 
                                <td>{{ this.jobTitle }}</td> 
                                <td><a href="https://twitter.com/?username={{ user.name }}">@{{ user.name }}</a></td> 
                            </tr>
                            <tr>{{ this.twitter }}</tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </template>

        <?php
            for ($i = 0; $i < array_keys($_GET)[0]; $i++) {
                echo '<article ooml-instantiate="Class1 class1elem' . $i . '"></article>';
            }
        ?>
    </main>

    <script src="/ooml.js"></script>
    <script>
        if (confirm("OK?")) {
            var elems = [],
                globals = {
                    user: {
                        name: 'GlobalName',
                        age: 16,
                        gender: 'GlobalGender',
                    }
                };

            var ooml = OOML.init({
                rootElem: 'main',
                globals: globals,
            });
        }
    </script>
</body>

</html>