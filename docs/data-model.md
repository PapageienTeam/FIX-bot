
## User(id, github_login, slack_id)
 + id: `<int>`
 + github_login: `<string>`
 + slack_id: `<string>`

## Issue(github_id, status, title, url)
 + github_id: `<int>`
 + status: `<int>` (0 `open` | 1 `closed`)
 + title: `<string>`
 + url: `<string>`

## user_issue_rel(user_id, issue_github_id, type)
 + user_id: `<int>`
 + issue_github_id: `<int>`
 + type: `<int>` (0 `assigned` | 1 `created` | 2 `mentioned` | 3 `subscribed`)
