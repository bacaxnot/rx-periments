import { Observable } from 'rxjs'
import './style.css'

// this is just an example observavble instantiation
const observable$ = new Observable(subscriber => {
    subscriber.next(0)
    subscriber.next(2)
    subscriber.next(92)
    subscriber.next(8)
})

// this is just an example observer implementation
const observer = {
    next: (value: any) => {
        console.log(value)
    },
    complete: () => {},
    error: (error: any) => {
        console.error(error)
    },
}

// example subscription
observable$.subscribe(observer)
