import React, { useState, useEffect } from "react";
import { Post } from "./Post";
import { Grid, GridList, GridListTile } from "@material-ui/core";

export const Feed = props => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setPosts([
                {
                    user: {
                        name: "afrailollady",
                        img:
                            "http://is1.mzstatic.com/image/thumb/Purple1/v4/84/ad/f5/84adf554-79db-b85d-42cd-19d8e4247369/pr_source.png/0x0ss-85.jpg"
                    },
                    url: "http://google.com",
                    title: "This is a post that links to Google!"
                },
                {
                    user: {
                        name: "afrailollady",
                        img:
                            "http://is1.mzstatic.com/image/thumb/Purple1/v4/84/ad/f5/84adf554-79db-b85d-42cd-19d8e4247369/pr_source.png/0x0ss-85.jpg"
                    },
                    url: "http://reddit.com",
                    title: "This is a post that links to Reddit!"
                },
                {
                    user: {
                        name: "afrailollady",
                        img:
                            "http://is1.mzstatic.com/image/thumb/Purple1/v4/84/ad/f5/84adf554-79db-b85d-42cd-19d8e4247369/pr_source.png/0x0ss-85.jpg"
                    },
                    title: "This week's boxoffice",
                    markdown: `
|*Rank*|*Title*|*Domestic Gross (Weekend)*|*Worldwide Gross (Cume)*|*Week #*|*Percentage Change*|*Budget*|
|:-|:-|:-|:-|:-|:-|:-|
|1|**Joker (2019)**|$18,900,000|$849,083,522|4|-35%|$55M|
|2|**Maleficent: Mistress of Evil**|$18,537,000|$293,512,158|2|-50%|$185M|
|3|**The Addams Family (2019)**|$11,705,007|$84,000,705|3|-28%|$40M|
|4|**Zombieland: Double Tap**|$11,600,000|$63,600,273|2|-57%|$42M|
|5|**Countdown**|$9,010,000|$10,720,000|1|N/A|$6.5M|

---

**Films Reddit Wants to Follow**

This is a segment where we keep a weekly tally of currently showing films that aren't in the Top 5 that fellow redditors want updates on. If you'd like me to add a film to this chart, make a comment in this thread.

|*Title*|*Domestic Gross (Weekly)*|*Domestic Gross (Cume)*|*Worldwide Gross (Cume)*|*Budget*|*Week #*|
|:-|:-|:-|:-|:-|:-|
|**Toy Story 4**|$116,756|$433,808,240|$1,070,808,240|$200M|19|
|**Spider-man: Far From Home**|$84,876|$390,532,085|$1,131,535,039|$160M|17|
|**Once Upon a Time in Hollywood**|$97,202|$140,422,518|$367,358,332|$90M|14|

---

**Notable Film Closings**

| *Title* | *Domestic Gross (Cume)* | *Worldwide Gross (Cume)* | *Budget* |
| ---- | ---- | ---- | ---- |
| **Aladdin** | $355,559,216 | $1,038,059,216 | $183M |
| **The Goldfinch** | $5,332,621 | $9,432,621 | $45M |
| **The Art of Racing in the Rain** | $26,402,818 | $30,789,257 | $16M |
| **Ready or Not** | $28,714,231 | $41,999,392 | $6M |

---

As always r/boxoffice is a great place to share links and other conversations about box office news.

Also you can see the archive of all Box Office Week posts at r/moviesboxoffice (which have recently been updated).`
                },
                {
                    user: { img: "", name: "throwaway1234" },
                    title: "This website it so awesome",
                    markdown: "[Reddit!](http://reddit.com/)"
                }
            ]);
        }, 2000);
    }, []);

    return (
        <GridList cellHeight={200} cols={3} spacing={20}>
            {posts.map((post, index) => (
                <GridListTile key={index} cols={1} rows={1}>
                    <Post {...post} key={index} />
                </GridListTile>
            ))}
        </GridList>
    );
};
