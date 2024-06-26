"""initial migration

Revision ID: c4d738d500b9
Revises: 
Create Date: 2024-03-25 11:05:10.189756

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c4d738d500b9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('category',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('errand_boy',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('password', sa.String(length=128), nullable=True),
    sa.Column('location', sa.String(length=120), nullable=True),
    sa.Column('profile_picture', sa.String(length=500), nullable=True),
    sa.Column('phone_number', sa.String(length=20), nullable=True),
    sa.Column('role', sa.String(length=20), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('errand_boy', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_errand_boy_email'), ['email'], unique=True)
        batch_op.create_index(batch_op.f('ix_errand_boy_username'), ['username'], unique=True)

    op.create_table('role',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('token_blocklist',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('jti', sa.String(length=36), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('token_blocklist', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_token_blocklist_jti'), ['jti'], unique=False)

    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('password', sa.String(length=128), nullable=True),
    sa.Column('location', sa.String(length=120), nullable=True),
    sa.Column('profile_picture', sa.String(length=500), nullable=True),
    sa.Column('phone_number', sa.String(length=20), nullable=True),
    sa.Column('role', sa.String(length=20), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_user_email'), ['email'], unique=True)
        batch_op.create_index(batch_op.f('ix_user_username'), ['username'], unique=True)

    op.create_table('availability',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('start_time', sa.Time(), nullable=True),
    sa.Column('end_time', sa.Time(), nullable=True),
    sa.Column('errand_boy_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['errand_boy_id'], ['errand_boy.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('message',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('message', sa.String(length=500), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('errand_boy_id', sa.Integer(), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['errand_boy_id'], ['errand_boy.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('message', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_message_timestamp'), ['timestamp'], unique=False)

    op.create_table('notification',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('message', sa.String(length=140), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('errand_boy_id', sa.Integer(), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['errand_boy_id'], ['errand_boy.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('notification', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_notification_timestamp'), ['timestamp'], unique=False)

    op.create_table('rating',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Float(), nullable=True),
    sa.Column('review', sa.String(length=500), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('errand_boy_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['errand_boy_id'], ['errand_boy.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('task',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=140), nullable=True),
    sa.Column('location', sa.String(length=120), nullable=True),
    sa.Column('status', sa.String(length=20), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('errand_boy_id', sa.Integer(), nullable=True),
    sa.Column('category_id', sa.Integer(), nullable=True),
    sa.Column('estimated_time', sa.Integer(), nullable=True),
    sa.Column('completed_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['category.id'], ),
    sa.ForeignKeyConstraint(['errand_boy_id'], ['errand_boy.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('payment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Float(), nullable=True),
    sa.Column('status', sa.String(length=20), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('errand_boy_id', sa.Integer(), nullable=True),
    sa.Column('task_id', sa.Integer(), nullable=True),
    sa.Column('payment_method', sa.String(length=20), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['errand_boy_id'], ['errand_boy.id'], ),
    sa.ForeignKeyConstraint(['task_id'], ['task.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('payment', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_payment_timestamp'), ['timestamp'], unique=False)

    op.create_table('history',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('task_id', sa.Integer(), nullable=True),
    sa.Column('errand_boy_id', sa.Integer(), nullable=True),
    sa.Column('payment_id', sa.Integer(), nullable=True),
    sa.Column('rating_id', sa.Integer(), nullable=True),
    sa.Column('category_id', sa.Integer(), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['category.id'], ),
    sa.ForeignKeyConstraint(['errand_boy_id'], ['errand_boy.id'], ),
    sa.ForeignKeyConstraint(['payment_id'], ['payment.id'], ),
    sa.ForeignKeyConstraint(['rating_id'], ['rating.id'], ),
    sa.ForeignKeyConstraint(['task_id'], ['task.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('history', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_history_timestamp'), ['timestamp'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('history', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_history_timestamp'))

    op.drop_table('history')
    with op.batch_alter_table('payment', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_payment_timestamp'))

    op.drop_table('payment')
    op.drop_table('task')
    op.drop_table('rating')
    with op.batch_alter_table('notification', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_notification_timestamp'))

    op.drop_table('notification')
    with op.batch_alter_table('message', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_message_timestamp'))

    op.drop_table('message')
    op.drop_table('availability')
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_user_username'))
        batch_op.drop_index(batch_op.f('ix_user_email'))

    op.drop_table('user')
    with op.batch_alter_table('token_blocklist', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_token_blocklist_jti'))

    op.drop_table('token_blocklist')
    op.drop_table('role')
    with op.batch_alter_table('errand_boy', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_errand_boy_username'))
        batch_op.drop_index(batch_op.f('ix_errand_boy_email'))

    op.drop_table('errand_boy')
    op.drop_table('category')
    # ### end Alembic commands ###
