<template>
  <p v-if="error"><strong>{{error}}</strong></p>
  <recent-threads :threads="data.threads"></recent-threads>
  <div v-if="data">
    <div class="category" v-for="cat in data.boards" :key="cat.id">
      <h2>{{cat.name}}</h2>
      <div class="board" v-for="board in cat.boards" :key="board.id">

        <div class="info">
          <a href="#">{{board.name}}</a>
          <div class="description">{{board.description}}</div>
          <div class="moderators" v-if="board.moderators && board.moderators.length">
            <strong>Moderators: </strong>
            <span v-for="(mod, i) in board.moderators" :key="mod.username">
              <a href="#">{{mod.username}}</a><span v-if="(i + 1) !== board.moderators.length">, </span>
            </span>
          </div>
          <div class="childboards" v-if="board.children.length">
            <strong>Child Boards:</strong>
            <span v-for="(child, i) in board.children" :key="child.id">
              <a href="#">{{child.name}}</a><span v-if="(i + 1) !== board.children.length">, </span>
            </span>
          </div>
        </div>

        <div class="board-secondary">
          <!-- Board Posts and Threads -->
          <div class="view-count">
            <p class="view-count-posts">
              <span class="view-count-number">{{board.post_count}}</span>
               <span class="label"> posts,</span>
            </p>
            <p class="view-count-threads">
              <span class="view-count-number">{{board.thread_count}}</span>
               <span class="label"> threads</span>
            </p>
          </div>

          <!-- Board Last Post By -->
          <div class="last-post">
            <div v-if="board.last_post_username">
              <span v-if="board.user_deleted || board.post_deleted">deleted</span>
              <img v-if="!board.user_deleted && !board.post_deleted" class="avatar-small round" v-bind:src="board.last_post_avatar" />
              <a v-if="!board.user_deleted && !board.post_deleted" href="#">{{board.last_post_username}}</a> posted in
              <span v-if="board.last_thread_title">
                <a href="#">{{board.last_thread_title }}</a> on
              </span>
              <span vi-if="board.last_post_created_at">
                <span>{{board.last_post_created_at}}</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import useSWRV from 'swrv'
import { inject } from 'vue'
import RecentThreads from "@/components/threads/RecentThreads.vue";

export default {
  name: 'Boards',
  components: {
    RecentThreads
  },
  setup() {
    const $api = inject('$api')
    const $swrvCache = inject('$swrvCache')

    const { data: data, error: error } = useSWRV(`/api/boards`, path => $api(`${path}`), {
      cache: $swrvCache });


    return {
      data,
      error
    }
  }
}
</script>

<style lang="scss">
img.avatar-small {
  border-radius: 100px;
  border: 1px solid #444;
  opacity: 1;
  margin: 0 0.1rem;
  height: 1rem;
  width: 1rem;
  object-fit: cover;
}
.category {
  // @include row;
  // border-top: $border;
  margin-bottom: 0.875rem;
  padding-top: 0.375rem;
  .title {
    h1 {
      display: inline-block;
      font-size: $font-size-sm;
      line-height: 1.5;
      // margin-top: 0.5rem;
      padding-left: 0;
    }
    a {
      display: inline-block;
      color: $secondary-font-color;
      width: 1rem;
      // font-size: 0.65rem;
      position: relative;
      // top: -0.2rem;
      &:hover,
      &:focus {
        text-decoration: none;
      }
    }

    .collapse-section {
       @include no-select;
       display: flex;
       align-items: center;
       margin-left: -1rem;
       cursor: pointer;

      .is-open {
        .icon__caretDown {
          transform: rotateZ(0deg);
          transition: all ease-in-out 150ms;
        }
      }

      .is-closed {
        .icon__caretDown {
          transform: rotateZ(-90deg);
          transition: all ease-in-out 150ms;
        }
      }

       .icon__caretDown {
         margin-bottom: 4px;
         width: 8px;

         polyline {
           fill: none;
           stroke: $secondary-font-color;
           stroke-linecap: round;
           stroke-miterlimit: 10;
           stroke-width: 7px;
         }
       }
      }
  }
  .board {
    display: flex;
    flex-direction: row;
    padding: 0 0 1rem 0;

    .info {
      flex: 2 0 0;
      margin-right: 1rem;
      word-break: break-word;

      .description,
      .childboards,
      .moderators {
        color: $secondary-font-color;
        font-size: $font-size-sm;
        line-height: 1;
        margin-bottom: 0.5rem;
      }

      .childboards {
        .board-name {
          font-weight: 600;
        }
      }

      .description {
        color: $base-font-color;
      }
    }

    h2 {
      font-size: $font-size-med;
      font-weight: 600;
      text-transform: none;

      a {
        color: $base-font-color;

        &:hover {
          color: $color-primary;
        }
      }
    }

    .board-secondary {
      display: flex;
      flex: 1;
      flex-direction: column;
    }

    .view-count {
      @include info-text;
      flex: 0 0 50%;

      &-posts,
      &-threads {
        display: flex;

        .label {
          flex: 0 0 50px;
          text-align: left;
        }
      }

      &-number {
        flex: 1 0 auto;
        font-weight: 600;
        margin-right: .25rem;;
        text-align: right;
      }
    }

    .last-post {
      @include info-text;
      flex: 2;
    }

    @media screen and (max-width: 960px) {
      .view-count {
        flex: 0 0 auto;
      }
      .view-count-posts,
      .view-count-threads {
        display: inline;
      }
      .view-count-number {
        margin-right: 0;
        text-align: left;
      }
    }

    @media screen and  (min-width: 960px) {
      .info {
        flex: 2;
      }
      .board-secondary {
        flex-direction: row;
          .view-count {
            padding-right: 2rem;
          }
        }
      }
  }

  @include break-mobile-sm {
    margin: 0 1rem 0 1.75rem;
  }
}
</style>