import * as Notifications from 'expo-notifications';



export function createSchedule(newTitle: string, newBody: string, newDate:Date){


    staticNotification(newTitle, newBody, newDate)
    console.log(`Date schedule at ${newDate}`)
}

async function staticNotification(title: string, body: string, date: Date) {

     const content: Notifications.NotificationContentInput = {
      title: title,
      body: body,
      sound: true,
      priority: "max",

    }

    const trigger: Notifications.DateTriggerInput = {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: date,


    };


    await
      Notifications.scheduleNotificationAsync({
        content,
        trigger
      })
  }


    
