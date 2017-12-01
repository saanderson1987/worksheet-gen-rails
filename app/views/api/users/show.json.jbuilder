json.partial! "api/users/user", user: @user

if @params[:subscribed_courses]
  json.subscribed_courses @user.subscribed_courses do |course|
    json.doc_list course.doc_list
  end
end

if @params[:admined_courses]
  json.admined_courses @user.admined_courses do |course|
    json.doc_list course.doc_list
  end
end
