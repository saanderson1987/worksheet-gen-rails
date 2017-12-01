@courses.each do |course|
  # json.set! course.id do
  #   json.extract! course, *course.attributes.keys
  # end
  json.set! course.id do
    json.partial! 'api/courses/course', course: course
  end
end
