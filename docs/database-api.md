# Database API

## Usage
```js
const db = require('./db');
```

```js
// Clear the complete database ^~^
await db.clearAll();
```

## Users
```js
await db.user.add({
	// Properties of entity: 'User'
});
```

## Issues
```js
await db.issue.add({
	// Properties of entity: 'Issue'

	assignee: <str> / null,
	creator: <str> / null
});
```

```js
let arrayOfIssues = await db.issue.listBySlackUserID('BLABLA_ID');
```
