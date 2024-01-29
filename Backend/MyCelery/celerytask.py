from celery import Celery

app = Celery('celery2')
app.config_from_object('celeryconfig')


@app.task
def test():
    return