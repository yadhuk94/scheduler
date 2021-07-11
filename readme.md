# Scheduler

This is an api to schedule jobs to add messages to the database.

## POST Schedule Message

```http
http://localhost:5000/api/v1/messages/schedule
```

This route will schedule a job on the date and time provided in the body to add the message to the database.

#### Body raw (json):

```json
{
  "message": "text",
  "date": "YYYY-MM-DD",
  "time": "HH:MM:SS"
}
```

- Message is a required field.
- If date is not provided it will directly add the message in the DB.
- If date is provided and time is not provided it will add message at 12 AM on that date.

## GET Get All Messages

```http
http://localhost:5000/api/v1/messages/
```

This will respond with all the messages in the database.

## GET Get All Schedules

```http
http://localhost:5000/api/v1/messages/schedule
```

This will respond with all the scheduled jobs (completed and uncompleted) in the database.
