

## Compile deps

```
apt install libicu-dev
```

## Local Testing

```
curl -X POST \
 -H "Content-Type: application/json" \
 -d '{"channel":"main","playername":"somedude","message":"rant about lag!"}' \
 http://127.0.0.1:8080/
```
