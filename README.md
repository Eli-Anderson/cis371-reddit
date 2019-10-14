# Proposal

---

We are planning to create a Reddit clone, simplified to fit into a half-semester, three-person project. We will include subreddits, posts, comments, and user profiles. Our stretch goals include the addition of private messaging, incorporating the (real) Reddit API into the app, and using Firebase Push Notifications.

The app will allow anonymous browsing, but posting, commenting, and viewing your profile requires an account. Users will create accounts using email/password combinations, or through an existing Google account.

---

We will use a Firestore database with the following structure:

```javasript
Subreddits: {
	URI: {
		Posts: {
	PostID: {
		UserID => string,
		Time => number,
		Views => number,
		Votes => number,
		Title => string,
		Link => string,
		Content => string,
		Comments: {
			CommentID: {
				Time => number,
				UserID => string,
				Votes => number,
				Content => string
			}
		}
	}
},
		Title => string,
		Description => string
	}
}
```

`Subreddits` is a collection storing documents that represent a subreddit. These are unique by their URI (i.e. http://oursite.com/subreddits/someSubredditURI), so we do not need to randomly generate IDs for them. These documents include the above data, where `Posts` is a collection of post documents.

`Posts` is a collection holding documents that represent posts on a subreddit. Each post will be given a randomly generated ID. Posts may or may not have a `comments` collection. The `comments` collection holds comments which also have randomly generated IDs. These comments are documents with the above data.

---

Users can create new Subreddits, Posts, and Comments (if signed in). These will update the page in real-time for all users. Users can also upvote/downvote Posts and Comments with the same effect.

```javascript
Users: {
  UserID: {
	  Public: {
      RecentlyViewed: {
        Time => number,
        PostID => string,
      },
      RecentlyVoted: {
        Time => number,
        PostID => string
      },
      Subscriptions => string[]
    },
    Private: {
      DisplayName => string,
      PushNotifications => boolean
    }
  }
}
```
---

Users will be able to access their profile which will act in one of the following ways:

1) Users can only access their personal profile, which will display:
   * A list of recently viewed posts
   * A list of recent posts
   * A list of recent comments
   * A list of the user’s subreddits (created or subscribed to?)
2) Users can access anyone’s profile, where:
   * Visiting their own profile will show the information in option 1
   * Visiting another user’s profile will display:
   * Only recent posts and comments

---

Users will be prompted to sign up for an account or login when: 
* Attempting to interact with posts
* Create a post
* Comment on a post
* Visit a current user’s profile
* Opening up the application 

---

We are planning to use ReactJS as our frontend library. We will attempt to create a UI similar to Reddit, but perhaps with some upgrades to the feed, as Reddit is a bit dated in that area – we may steer away from the typical 2000s forum style and more towards the modern Facebook/Twitter feed look.
