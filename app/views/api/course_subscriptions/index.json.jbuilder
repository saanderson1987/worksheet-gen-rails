@course_subscriptions.each do |course_subscription|
  json.set! course_subscription.id do
    json.extract! course_subscription, *course_subscription.attributes.keys
  end
  # json.set! course_subscription.id do
  #   json.partial! ''api/course_subscriptions/course_subscription', course_subscription: course_subscription
  # end
end
