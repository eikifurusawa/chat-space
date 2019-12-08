## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user|string|null: false, |
|group|string|null: false, |
### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :users, through: :groups_users
- has_many :groups_users
- has_many :messages

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|nickname|string|null: false, index: true|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :groups, through: :groups_usres
- has_many :groups_users
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|message_id|integer|null: false|
|text|text||
|image|text||
|user-id|intrger|null: false, |
|group_id|integer|null: false, |
### Association
- belongs_to :user
- belongs_to :group