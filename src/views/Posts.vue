<template>
  <div class="thread-controls-wrap" v-if="postData.data?.thread">
    <!-- Moderated Thread Banner -->
    <div class="banner-container">
      <div class="banner warning" v-if="postData.data?.thread.moderated">
        Moderated Thread &mdash; <em>Thread starter can moderate posts.</em>
      </div>
    </div>

    <!-- Page Title -->
    <div class="page-header-split">
      <!-- Show Title -->
      <div v-if="!editThread" class="thread-title">
        <h1>{{postData.data.thread.title}}</h1>
        <a href="#" data-balloon="Edit Thread Title" class="do-edit" v-if="canEditTitle()" @click.prevent="openEditThread()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <title></title>
            <path d="M7.38,33.74h0L4,44l10.26-3.39h0L41.74,13.14,34.86,6.26Zm31-21.15.54.55L14.26,37.79l-.54-.54" />
            <path d="M45.48,6.89,41.11,2.52a1.78,1.78,0,0,0-2.5,0L36.11,5,43,11.89l2.5-2.5A1.76,1.76,0,0,0,45.48,6.89Z" />
          </svg>
        </a>
        <div class="threadStates">
          <div class="badge locked" v-if="postData.data.thread.locked">
            <div>
              <a href="" id="lockThread" :data-balloon="postData.data.thread.locked ? 'Unlock Thread' : 'Lock Thread'" v-if="canLock()" :class="{'clicked' : postData.data.thread.locked }" @click.prevent="updateThreadLock(postData.data.thread)" class="badgeContents">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <title></title>
                  <path
                    d="M40,21H37.5V16.48a13.5,13.5,0,0,0-27,0V21H8a2,2,0,0,0-2,2V43a2,2,0,0,0,2,2H40a2,2,0,0,0,2-2V23A2,2,0,0,0,40,21ZM15.5,16.48a8.5,8.5,0,0,1,17,0V21h-17Z" />
                </svg>
                Locked
              </a>
              <span id="cannotThread" v-if="!canLock()" :class="{'clicked' : postData.data.thread.locked }" class="badgeContents">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <title></title>
                  <path
                    d="M40,21H37.5V16.48a13.5,13.5,0,0,0-27,0V21H8a2,2,0,0,0-2,2V43a2,2,0,0,0,2,2H40a2,2,0,0,0,2-2V23A2,2,0,0,0,40,21ZM15.5,16.48a8.5,8.5,0,0,1,17,0V21h-17Z" />
                </svg>
                Locked
              </span>
            </div>
          </div>
          <div class="badge sticky" v-if="postData.data.thread.sticky">
            <a href="#" id="badge__stickyThread"
              :class="{'clicked' : postData.data.thread.sticky }"
              v-if="canSticky()"
              @click.prevent="updateThreadSticky(postData.data.thread)" class="badgeContents" :data-balloon="postData.data.thread.canSticky ? 'Sticky Thread' : 'Unsticky Thread'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <title></title>
                  <g id="icons"><path d="M44.27,11.92,35.08,2.73a2.5,2.5,0,1,0-3.53,3.53l9.19,9.19a2.5,2.5,0,0,0,3.53-3.53Z"/><path d="M16.34,16.51a3,3,0,1,0-4.24,4.25l5.66,5.65L6.44,37.73l-2.12,5,4.95-2.12L20.59,29.24l5.65,5.66a3,3,0,1,0,4.25-4.24Z"/><rect x="21.78" y="11.22" width="16" height="12" transform="translate(-3.46 26.1) rotate(-45)"/>
                </g>
              </svg>
              Sticky
            </a>
            <span id="badge__cannotStickyThread"
              :class="{'clicked' : postData.data.thread.sticky }"
              v-if="!canSticky()"
              class="badgeContents">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <title></title>
                  <g id="icons"><path d="M44.27,11.92,35.08,2.73a2.5,2.5,0,1,0-3.53,3.53l9.19,9.19a2.5,2.5,0,0,0,3.53-3.53Z"/><path d="M16.34,16.51a3,3,0,1,0-4.24,4.25l5.66,5.65L6.44,37.73l-2.12,5,4.95-2.12L20.59,29.24l5.65,5.66a3,3,0,1,0,4.25-4.24Z"/><rect x="21.78" y="11.22" width="16" height="12" transform="translate(-3.46 26.1) rotate(-45)"/>
                </g>
              </svg>
              Sticky
            </span>
          </div>
          <div class="badge watched" v-if="postData.data.thread.watched">
            <div>
              <a href="" id="watchThread" :data-balloon="postData.data.thread.watched ? 'Unwatch Thread' : 'Watch Thread'" :class="{'clicked' : postData.data.thread.watched }" @click.prevent="watchThread()" class="badgeContents">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <title></title>
                <path
                  d="M24,9.75C11.3,9.75,0,24,0,24S11.3,38.25,24,38.25,48,24,48,24,36.7,9.75,24,9.75ZM24,36A12,12,0,1,1,36,24,12,12,0,0,1,24,36Z" />
                <path d="M24,15a8.89,8.89,0,0,0-3.06.57,3.93,3.93,0,1,1-5.37,5.37A8.89,8.89,0,0,0,15,24a9,9,0,1,0,9-9Z" />
              </svg>
                Watched
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- Edit Title -->
      <div v-if="editThread" class="edit-thread-title">
        <form @submit.prevent="updateThreadTitle()">
          <input type="text" v-model="postData.data.thread.title" maxlength="255">
          <div class="actions">
            <button @click.prevent="closeEditThread()" class="secondary small">Cancel</button>
            <button type="submit" :disabled="postData.data.thread.title.length === 0" class="small">Save</button>
          </div>
        </form>
      </div>
    </div>


    <!-- Polls -->
    <div class="fill-row" v-if="addPoll">
      <!-- <poll-creator poll="PostsParentCtrl.poll" valid="PostsParentCtrl.pollValid"></poll-creator> -->
      <button class="fill-row" :disabled="!pollValid" @click.prevent="createPoll()">Create Poll</button>
    </div>
    <!-- <poll-viewer thread="PostsParentCtrl.thread" user-priority="PostsParentCtrl.posts[0].user.priority" reset="PostsParentCtrl.resetPoll"></poll-viewer> -->

    <!-- <pagination page-count="PostsParentCtrl.pageCount" page="PostsParentCtrl.page"></pagination> -->

  </div>

  <!-- Ads -->
  <!-- <ad-viewer page="PostsParentCtrl.page"></ad-viewer> -->

  <!-- Posts Listing -->
  <div v-if="postData.data?.posts">
    <div :id="post.id" v-for="(post, i) in postData.data.posts" :key="post.id" class="post-block" :class="{ 'highlighted': post.highlighted, 'hidden': post.hidden, 'deleted': post._deleted || post.user.ignored,  'editing': post.id === posting.post.id }">
      <!-- Delete Post View -->
      <div class="deleted" v-if="post._deleted || post.user.ignored">
        Post
        <span v-if="post._deleted">Hidden</span>
        <div class="right bold secondary-font-color-light" v-if="post._deleted">#{{post.position}}</div>
        <span v-if="post.user.ignored">Ignored</span>
        <small class="pointer" v-if="post.user.ignored" @click.prevent="post.user.ignored = false">
          <strong>- Show Post</strong>
        </small>
      </div>

      <!-- Visible Post View -->
      <div v-if="!post._deleted && !post.user.ignored" class="post-block-grid">
        <!-- Post Profile Section -->
        <div class="post-user">
          <a href="#">
          <!-- <a ui-sref="profile.posts({ username: post.user.username})"> -->
            <div class="user-avatar" :class="defaultAvatarShape">
              <span v-if="post.user.online" class="online green" :data-balloon="post.user.username + ' is online'">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <title></title>
                  <circle cx="24" cy="24" r="16" />
                </svg>
              </span>
              <router-link :to="{ path: '/profile/' + post.user.username.toLowerCase() }">
                <img :src="post.avatar || defaultAvatar" @error="$event.target.src=defaultAvatar" />
              </router-link>
            </div>
            <router-link :to="{ path: '/profile/' + post.user.username.toLowerCase() }">
              <div class="original-poster" v-if="post.user.original_poster">OP</div>
              <div v-if="post.user.activity > -1" :title="('Activity: ' + post.user.activity)" class="user-activity">Act: <span class="user-activity-value">{{post.user.activity}}</span></div>
            </router-link>
          </a>


          <div class="user-trust" v-if="loggedIn">
            <!-- <trust-score user="post.user" visible="postData.data.thread.trust_visible"></trust-score> -->
          </div>

          <div class="user-rank">
            <rank-display :user="{ ...post.user, metadata: {...postData.data.metadata } }" />
          </div>
          <div v-if="loggedIn && post.user.id !== authedUser.id" class="ignore-directive">
            <a href="" @click.prevent="toggleIgnoredPosts(post)" v-html="post.user._ignored ? 'Unignore Posts' : 'Ignore Posts'"></a>
          </div>
          <!-- TODO(akinsey): <ignore-posts post="post"></ignore-posts> -->
        </div>

        <!-- Post Body Section -->
        <div :id="(i + 1) === postData.data.posts.length ? 'last' : ''" class="post-content">
          <!-- Post Title -->
          <div class="post-title">
            <div class="post-title-user">
              <span class="username" :data-balloon="post.user.role_name || 'User'"><router-link :to="{ path: '/profile/' + post.user.username.toLowerCase() }" v-html="post.user.username" /></span>
              <div :title="post.user.name" v-if="post.user.name" class="display-name">
                <span>{{truncate(post.user.name, 33)}}</span>
                <span class="hide-mobile">&nbsp;&mdash;&nbsp;</span>
              </div>
              <div :title="post.user.role_name || 'user'" class="user-role" :style="userRoleHighlight(post.user.highlight_color)">{{post.user.role_name || 'user'}}</div>
              <div class="timestamp">
                <span>{{humanDate(post.created_at)}}</span>
                <span v-if="showEditDate(post) && post.metadata?.edited_by_username">{{'&nbsp;&mdash;&nbsp;Edited ' + humanDate(post.updated_at) + ' by '}}</span><a v-if="showEditDate(post) && post.metadata?.edited_by_username" href="#">{{post.metadata.edited_by_username}}</a>
                <span v-if="showEditDate(post) && !post.metadata?.edited_by_username">{{'&nbsp;&mdash;&nbsp;Edited ' + humanDate(post.updated_at)}}</span>
                <span v-if="post.metadata?.locked_by_username">{{'&nbsp;&mdash;&nbsp;Locked ' + humanDate(post.metadata.locked_at) + ' by '}}</span>
                <a v-if="post.metadata?.locked_by_username" href="#">{{post.metadata.locked_by_username}}</a>
              </div>
            </div>

            <ul class="post-action">
              <li v-if="canPurgePost(post) && post.position !== 1">
                <a href="" class="post-action-icon" @click.prevent="openPostsPurgePostModal(post, i)" data-balloon="Purge">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <title></title>
                    <path
                      d="M7.73,14.82,12.08,45H35.92l4.35-30.18H7.73Zm9.69,25.26A1.23,1.23,0,0,1,16.08,39L14.52,21.08a1.23,1.23,0,0,1,1.12-1.34A1.22,1.22,0,0,1,17,20.86l1.57,17.89A1.22,1.22,0,0,1,17.42,40.08ZM31,20.86a1.22,1.22,0,0,1,1.33-1.12,1.23,1.23,0,0,1,1.12,1.34L31.92,39a1.23,1.23,0,0,1-2.46-.21Zm-5.8.08v18a1.23,1.23,0,1,1-2.46,0V20.94a1.23,1.23,0,1,1,2.46,0Z" />
                    <path
                      d="M39.32,7.64H32.14C32.14,3,28.39,3,28.39,3H19.61s-3.75,0-3.75,4.64H8.68a1.93,1.93,0,0,0-2.09,2v3.23H41.41V9.61A1.93,1.93,0,0,0,39.32,7.64Zm-10-.1H18.72V7A1.59,1.59,0,0,1,20.3,5.43h7.4A1.59,1.59,0,0,1,29.28,7Z" />
                  </svg>
                </a>
              </li>
              <li v-if="canDelete(post) && post.position !== 1 && !post.deleted">
                <a href="" class="post-action-icon" @click.prevent="openPostsDeleteModal(post)" data-balloon="Hide">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <title></title>
                    <path
                      d="M39.22,15.68l-3.64,5.2A12.36,12.36,0,0,1,36,24,12,12,0,0,1,25,36l-1.6,2.28.57,0C36.7,38.25,48,24,48,24A51.61,51.61,0,0,0,39.22,15.68Z" />
                    <path
                      d="M34.18,4.65l-4.25,6.08a19.49,19.49,0,0,0-5.93-1C11.3,9.75,0,24,0,24A49.75,49.75,0,0,0,12.93,35l-4.7,6.71,4.91,3.45,26-37.08ZM12,24A12,12,0,0,1,24,12a11.86,11.86,0,0,1,4.43.87l-1.78,2.54a8.62,8.62,0,0,0-5.71.16,3.93,3.93,0,1,1-5.37,5.37,8.8,8.8,0,0,0,1.26,8.49L15.05,32A12,12,0,0,1,12,24Z" />
                    <path d="M33,24.6l-5.34,7.63A9,9,0,0,0,33,24.6Z" />
                  </svg>
                </a>
              </li>
              <li v-if="canDelete(post) && post.deleted">
                <a href="" class="post-action-icon selected" @click.prevent="openPostsUndeleteModal(post)" data-balloon="Unhide">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <title></title>
                    <path
                      d="M39.22,15.68l-3.64,5.2A12.36,12.36,0,0,1,36,24,12,12,0,0,1,25,36l-1.6,2.28.57,0C36.7,38.25,48,24,48,24A51.61,51.61,0,0,0,39.22,15.68Z" />
                    <path
                      d="M34.18,4.65l-4.25,6.08a19.49,19.49,0,0,0-5.93-1C11.3,9.75,0,24,0,24A49.75,49.75,0,0,0,12.93,35l-4.7,6.71,4.91,3.45,26-37.08ZM12,24A12,12,0,0,1,24,12a11.86,11.86,0,0,1,4.43.87l-1.78,2.54a8.62,8.62,0,0,0-5.71.16,3.93,3.93,0,1,1-5.37,5.37,8.8,8.8,0,0,0,1.26,8.49L15.05,32A12,12,0,0,1,12,24Z" />
                    <path d="M33,24.6l-5.34,7.63A9,9,0,0,0,33,24.6Z" />
                  </svg>
                </a>
              </li>
              <li v-if="canPostLock(post) && !post.locked">
                <a href="" class="post-action-icon" @click.prevent="lockPost(post)" data-balloon="Lock Post">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <title></title>
                    <path
                      d="M40,21H37.5V16.48a13.5,13.5,0,0,0-27,0V21H8a2,2,0,0,0-2,2V43a2,2,0,0,0,2,2H40a2,2,0,0,0,2-2V23A2,2,0,0,0,40,21ZM15.5,16.48a8.5,8.5,0,0,1,17,0V21h-17Z" />
                  </svg>
                </a>
              </li>
              <li v-if="canPostLock(post) && post.locked">
                <a href="" class="post-action-icon selected" @click.prevent="unlockPost(post)" data-balloon="Unlock Post">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <title></title>
                    <path
                      d="M40,21H37.5V16.48a13.5,13.5,0,0,0-27,0V21H8a2,2,0,0,0-2,2V43a2,2,0,0,0,2,2H40a2,2,0,0,0,2-2V23A2,2,0,0,0,40,21ZM15.5,16.48a8.5,8.5,0,0,1,17,0V21h-17Z" />
                  </svg>
                </a>
              </li>

              <li v-if="loggedIn && (permissionUtils.hasPermission('reports.createPostReport') || permissionUtils.hasPermission('reports.createUserReport')) && !bannedFromBoard">
                <a href="" class="post-action-icon" @click.prevent="openPostsReportModal(post)" data-balloon="Report">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <title></title>
                    <path
                      d="M46.7,41.82l-21.4-37a1.5,1.5,0,0,0-2.6,0l-21.4,37A1.45,1.45,0,0,0,2.6,44H45.4A1.45,1.45,0,0,0,46.7,41.82ZM26.08,18,25.5,32h-3l-.57-14ZM24,39.21a2.5,2.5,0,1,1,2.43-2.5A2.35,2.35,0,0,1,24,39.21Z" />
                  </svg>
                </a>
              </li>
              <li v-if="canUpdate(post)">
                <a href="" class="post-action-icon" @click.prevent="loadEditor(post)" data-balloon="Edit">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <title></title>
                    <path d="M7.38,33.74h0L4,44l10.26-3.39h0L41.74,13.14,34.86,6.26Zm31-21.15.54.55L14.26,37.79l-.54-.54" />
                    <path d="M45.48,6.89,41.11,2.52a1.78,1.78,0,0,0-2.5,0L36.11,5,43,11.89l2.5-2.5A1.76,1.76,0,0,0,45.48,6.89Z" />
                  </svg>
                </a>
              </li>
              <li v-if="canPost()">
                <a href="" class="post-action-icon" @click.prevent="addQuote(post)" data-balloon="Quote">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <title></title>
                    <path
                      d="M42,2H6A4,4,0,0,0,2,6V32a4,4,0,0,0,4,4H27.74l10.88,9.71c.63.63,1.38.18,1.38-.71V36h2a4,4,0,0,0,4-4V6A4,4,0,0,0,42,2ZM22,18a13.67,13.67,0,0,1-.42,3.27,8.32,8.32,0,0,1-1.17,2.69,5.39,5.39,0,0,1-1.76,1.85,9.62,9.62,0,0,1-2.65.69V23.59a4.07,4.07,0,0,0,1.4-.49,3.53,3.53,0,0,0,.93-1.3A5.68,5.68,0,0,0,18.82,20a17.87,17.87,0,0,0,.09-2H16V12h6Zm9.88,3.27a8.39,8.39,0,0,1-1,2.69,6,6,0,0,1-2,1.85c-.79.46-.87.69-2.87.69V23.59a5,5,0,0,0,1.69-.49,3.86,3.86,0,0,0,1.08-1.3A6.29,6.29,0,0,0,29.33,20c.1-.68.16-2,.16-2H26V12h6v6A14,14,0,0,1,31.88,21.25Z" />
                  </svg>
                </a>
              </li>
              <li v-if="loggedIn && postData.data.thread.locked">
                <a href="" @click.prevent="copyQuote(post)" data-balloon="Quote">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <title></title>
                    <path
                      d="M42,2H6A4,4,0,0,0,2,6V32a4,4,0,0,0,4,4H27.74l10.88,9.71c.63.63,1.38.18,1.38-.71V36h2a4,4,0,0,0,4-4V6A4,4,0,0,0,42,2ZM22,18a13.67,13.67,0,0,1-.42,3.27,8.32,8.32,0,0,1-1.17,2.69,5.39,5.39,0,0,1-1.76,1.85,9.62,9.62,0,0,1-2.65.69V23.59a4.07,4.07,0,0,0,1.4-.49,3.53,3.53,0,0,0,.93-1.3A5.68,5.68,0,0,0,18.82,20a17.87,17.87,0,0,0,.09-2H16V12h6Zm9.88,3.27a8.39,8.39,0,0,1-1,2.69,6,6,0,0,1-2,1.85c-.79.46-.87.69-2.87.69V23.59a5,5,0,0,0,1.69-.49,3.86,3.86,0,0,0,1.08-1.3A6.29,6.29,0,0,0,29.33,20c.1-.68.16-2,.16-2H26V12h6v6A14,14,0,0,1,31.88,21.25Z" />
                  </svg>
                </a>
              </li>
              <li>
                <router-link :to="{ name: 'Posts', query: { page: postData.data.page, limit: postData.data.limit }, hash: `#${post.id}`}" class="post-action-icon" data-balloon="Permalink">
                  <!-- <i class="icon-epoch-link"></i> -->
                  <strong>#{{post.position}}</strong>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- Post Body -->
          <!-- TODO(akinsey): post-processing="post.body_html" style-fix="true" -->
          <div class="post-body" :class="{ 'rtl': post.right_to_left }" v-html="post.body_html"></div>
          <div v-if="post.user.signature && !disableSignature">
            <!-- TODO(akinsey): post-processing="post.user.signature" style-fix="true" -->
            <div class="post-signature" v-html="post.user.signature"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <span id="last"></span>

  <!-- Sidebar -->
  <div class="sidebar">
    <div class="sidebar-block">
      <div v-if="canPost()" class="sidebar-actions">
        <!-- <a class="button" @click.prevent="loadEditor()" v-if="PostsParentCtrl.canPost()">Post Reply</a> -->

        <!-- Post Tools -->
        <div class="post-tools">
          <!-- Watch Thread -->
          <div v-if="showUserControls()" >
            <a class="pointer" :class="{'clicked' : postData.data?.thread.watched }" @click.prevent="watchThread()" :data-balloon="postData.data?.thread.watched ? 'Unwatch Thread' : 'Watch Thread'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <title></title>
                <path
                  d="M24,9.75C11.3,9.75,0,24,0,24S11.3,38.25,24,38.25,48,24,48,24,36.7,9.75,24,9.75ZM24,36A12,12,0,1,1,36,24,12,12,0,0,1,24,36Z" />
                <path d="M24,15a8.89,8.89,0,0,0-3.06.57,3.93,3.93,0,1,1-5.37,5.37A8.89,8.89,0,0,0,15,24a9,9,0,1,0,9-9Z" />
              </svg>
            </a>
          </div>

          <!-- Add a Poll -->
          <div v-if="showUserControls()">
            <a class="pointer" v-if="canCreatePoll()"
              @click.prevent="addPoll = !addPoll" data-balloon="Add a Poll">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <title></title>
                <polygon points="43.25 41.75 4.75 41.75 4.75 6.25 7.75 6.25 7.75 38.75 43.25 38.75 43.25 41.75" />
                <rect x="9.75" y="28.75" width="6" height="8" />
                <rect x="18.75" y="18.75" width="6" height="18" />
                <rect x="27.75" y="23.75" width="6" height="13" />
                <rect x="36.75" y="8.75" width="6" height="28" />
              </svg>
            </a>
          </div>

          <!-- Thread Lock -->
          <div class="control" v-if="canLock()">
            <a class="pointer" id="lockThread" :class="{'clicked' : postData.data?.thread.locked }"
              @click.prevent="updateThreadLock(postData.data.thread)" :data-balloon="postData.data.thread.locked ? 'Unlock Thread' : 'Lock Thread'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <title></title>
                <path
                  d="M40,21H37.5V16.48a13.5,13.5,0,0,0-27,0V21H8a2,2,0,0,0-2,2V43a2,2,0,0,0,2,2H40a2,2,0,0,0,2-2V23A2,2,0,0,0,40,21ZM15.5,16.48a8.5,8.5,0,0,1,17,0V21h-17Z" />
              </svg>
            </a>
          </div>

          <!-- Thread Sticky -->
          <div class="control" v-if="canSticky()">
            <a href="#" id="stickyThread" :class="{'clicked' : postData.data?.thread.sticky }"
              @click.prevent="updateThreadSticky(postData.data.thread)" :data-balloon="postData.data.thread.sticky ? 'Unsticky Thread' : 'Sticky Thread'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <title></title>
                  <g id="icons"><path d="M44.27,11.92,35.08,2.73a2.5,2.5,0,1,0-3.53,3.53l9.19,9.19a2.5,2.5,0,0,0,3.53-3.53Z"/><path d="M16.34,16.51a3,3,0,1,0-4.24,4.25l5.66,5.65L6.44,37.73l-2.12,5,4.95-2.12L20.59,29.24l5.65,5.66a3,3,0,1,0,4.25-4.24Z"/><rect x="21.78" y="11.22" width="16" height="12" transform="translate(-3.46 26.1) rotate(-45)"/>
                </g>
              </svg>
            </a>
          </div>

          <!-- Purge Delete -->
          <div class="control" v-if="canPurgeThread()">
            <a href="#" id="purgeThread" :class="{'clicked' : showPostsPurgeThreadModal}"
              @click.prevent="openPostsPurgeThreadModal()" data-balloon="Purge Thread">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <title></title>
                <path
                  d="M24,2A22,22,0,1,0,46,24,22,22,0,0,0,24,2ZM35.67,32.13l-3.54,3.54L24,27.54l-8.13,8.13-3.54-3.54L20.46,24l-8.13-8.13,3.54-3.54L24,20.46l8.13-8.13,3.54,3.54L27.54,24Z" />
              </svg>
            </a>
          </div>

          <!-- Move Thread -->
          <div class="control" v-if="canMove()">
            <a href="#" id="moveBoard" :class="{'clicked' : showPostsMoveThreadModal}"
              @click.prevent="openMoveThreadModal()" data-balloon="Move Thread">
              <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <title></title>
                <path d="m29.36 7.74a3 3 0 0 0 -4.25 4.26l9 9h-28.73a3 3 0 0 0 0 6h28.76l-9 9a3 3 0 0 0 4.25 4.24l16.23-16.24z" />
              </svg>
            </a>
          </div>

        </div>
      </div>

      <!-- Poll Viewer -->
      <poll-viewer v-if="postData.data.thread?.poll" :poll="postData.data.thread.poll" :thread="postData.data.thread" :user-priority="postData.data.posts[0].user.priority" :reset="resetPoll"></poll-viewer>

      <pagination v-if="postData.data?.thread" :page="postData.data.page" :limit="postData.data.limit" :count="postData.data.thread.post_count"></pagination>
    </div>

  </div>

  <!-- Bottom Actions and Pagination -->
  <div class="actions-bottom">
    <div class="actions-bottom-grid">
      <div id="pagination-bottom" class="pagination-bottom">
      </div>
      <div v-if="canPost()" class="sidebar-actions">
        <a class="button small" @click.prevent="loadEditor()" v-if="canPost()">Post Reply</a>
      </div>
    </div>
  </div>

  <!-- Editor -->
  <!-- <div v-if="PostsParentCtrl.canPost() && PostsParentCtrl.showEditor"> -->
  <!--   <epochtalk-editor class="posts-editor" -->
  <!--     body-html="PostsParentCtrl.posting.post.body_html" -->
  <!--     body="PostsParentCtrl.posting.post.body" -->
  <!--     posting="PostsParentCtrl.posting" -->
  <!--     reset-switch="PostsParentCtrl.resetEditor" -->
  <!--     focus-switch="PostsParentCtrl.focusEditor" -->
  <!--     dirty="PostsParentCtrl.dirtyEditor" -->
  <!--     quote="PostsParentCtrl.quote" -->
  <!--     thread="PostsParentCtrl.thread" -->
  <!--     post-editor-mode="true" -->
  <!--     create-action="PostsParentCtrl.savePost" -->
  <!--     can-create="PostsParentCtrl.canSave" -->
  <!--     show-switch="PostsParentCtrl.showEditor"> -->
  <!--   </epochtalk-editor> -->
  <!-- </div> -->
  <posts-delete-modal :selectedPost="selectedPost" :show="showPostsDeleteModal" @close="showPostsDeleteModal = false; selectedPost = null"/>
  <posts-undelete-modal :selectedPost="selectedPost" :show="showPostsUndeleteModal" @close="showPostsUndeleteModal = false; selectedPost = null"/>
  <posts-purge-post-modal :selectedPost="selectedPost" :selectedPostIndex="selectedPostIndex" :page="postData.data.page" :limit="postData.data.limit" :posts="postData.data?.posts" :show="showPostsPurgePostModal" @close="showPostsPurgePostModal = false; selectedPost = null; selectedPostIndex = 0"/>
  <posts-move-thread-modal v-if="canMove()" :threadId="postData.data.thread?.id" :show="showPostsMoveThreadModal" @close="showPostsMoveThreadModal = false"/>
  <posts-purge-thread-modal :threadId="postData.data.thread?.id" :boardId="postData.data.board?.id" :boardSlug="postData.data.board?.slug" :show="showPostsPurgeThreadModal" @close="showPostsPurgeThreadModal = false"/>
  <posts-report-modal :selectedPost="selectedPost" :canReportPosts="true" :canReportUsers="true" :show="showPostsReportModal" @close="showPostsReportModal = false; selectedPost = null"/>
</template>

<script>
import { useRoute } from 'vue-router'
import Pagination from '@/components/layout/Pagination.vue'
import PollViewer from '@/components/polls/PollViewer.vue'
import RankDisplay from '@/components/users/RankDisplay.vue'
import humanDate from '@/composables/filters/humanDate'
import dayjs from 'dayjs'
import { userRoleHighlight } from '@/composables/utils/userUtils'
import truncate from '@/composables/filters/truncate'
import { inject, reactive, watch, toRefs } from 'vue'
import { postsApi, threadsApi, usersApi, watchlistApi } from '@/api'
import { AuthStore } from '@/composables/stores/auth'
import { PreferencesStore, localStoragePrefs } from '@/composables/stores/prefs'
import PostsDeleteModal from '@/components/modals/posts/Delete.vue'
import PostsUndeleteModal from '@/components/modals/posts/Undelete.vue'
import PostsPurgePostModal from '@/components/modals/posts/PurgePost.vue'
import PostsMoveThreadModal from '@/components/modals/posts/MoveThread.vue'
import PostsPurgeThreadModal from '@/components/modals/posts/PurgeThread.vue'
import PostsReportModal from '@/components/modals/posts/Report.vue'
import { BreadcrumbStore } from '@/composables/stores/breadcrumbs'
import BanStore from '@/composables/stores/ban'

export default {
  name: 'Posts',
  props: ['threadSlug', 'threadId'],
  components: { Pagination, PostsDeleteModal, PostsUndeleteModal, PostsPurgePostModal, PostsMoveThreadModal, PostsPurgeThreadModal, PostsReportModal, PollViewer, RankDisplay },
  beforeRouteEnter(to, from, next) {
    const params = {
      limit: localStoragePrefs().data.posts_per_page,
      page: isNaN(to.query.start) ? to.query.page || 1 : undefined,
      start: isNaN(to.query.start) ? undefined : Number(to.query.start)
    }
    threadsApi.slugToThreadId(to.params.threadSlug).then(t => t.id)
      .then(threadId => {
        params.thread_id = threadId
        return postsApi.byThread(params)
        .then(data => next(vm => {
          vm.postData.data = data
          BanStore.updateBanNotice(vm.postData.data.banned_from_board)
          vm.bannedFromBoard = vm.postData.data.banned_from_board
          vm.highlightPost()
        }))
      })
  },
  beforeRouteUpdate(to, from, next) {
    const params = {
      limit: localStoragePrefs().data.posts_per_page,
      page: isNaN(to.query.start) ? to.query.page || 1 : undefined,
      start: isNaN(to.query.start) ? undefined : Number(to.query.start)
    }
    threadsApi.slugToThreadId(to.params.threadSlug).then(t => t.id)
      .then(threadId => {
        params.thread_id = threadId
        return postsApi.byThread(params).then(data => {
          this.postData.data = data
          BanStore.updateBanNotice(this.postData.data.banned_from_board)
          this.bannedFromBoard = this.postData.data.banned_from_board
          this.highlightPost()
          next()
        })
      })
  },
  beforeRouteLeave(to, from, next) { // clears ban message
    BanStore.updateBanNotice()
    next()
  },
  setup(props) {
    /* Internal Methods */
    const processPosts = () => {
      return Promise.resolve(props.threadId)
      .then(threadId => {
        const params = {
          thread_id: threadId,
          limit: v.prefs.posts_per_page,
          page: isNaN($route.query.start) ? $route.query.page || 1 : undefined,
          start: isNaN($route.query.start) ? undefined : Number($route.query.start)
        }
        return postsApi.byThread(params)
      })
    }
    const postEditDisabled = (createdAt) => {
      // get amount of time post edit has been disabled for in ms (if available)
      const disablePostEdit = v.postData.data.board.disable_post_edit
      if (disablePostEdit && Number(disablePostEdit) > -1) {
        const disablePostEditDuration = dayjs.duration(disablePostEdit)
        const currentTime = dayjs()
        const createdAtTime = dayjs(createdAt)
        // if elapsed time since creation has not passed disabled duration
        // post edit is disabled
        return currentTime.isBefore(createdAtTime.add(disablePostEditDuration))
      }
      else return false
    }
    /* View Methods */
    const canEditTitle = () => {
      if (!v.loggedIn) return false
      if (v.bannedFromBoard) return false
      if (!v.permissionUtils.hasPermission('threads.title.allow')) return false
      if (!v.postData.data?.write_access) return false

      const adminBypass = v.permissionUtils.hasPermission('threads.title.bypass.owner.admin')
      const modBypass = v.permissionUtils.hasPermission('threads.title.bypass.owner.mod')
      const priorityBypass = v.permissionUtils.hasPermission('threads.title.bypass.owner.priority')
      const userPriority = v.postData.data.posts[0].user.priority
      const elevatedPrivileges = adminBypass || modBypass || priorityBypass

      // check if post edit is disabled
      if (postEditDisabled(v.postData.data.thread.created_at) && !elevatedPrivileges) return false

      if (v.postData.data.thread.user.id === v.authedUser.id) return true
      else if (adminBypass) return v.permissionUtils.getPriority() <= userPriority
      else if (modBypass) return v.permissionUtils.getPriority() < userPriority && v.permissionUtils.moderatesBoard(v.postData.data.board.id)
      else if (priorityBypass) return v.permissionUtils.getPriority() < userPriority
      else return false
    }
    const canPost = () => {
      if (v.bannedFromBoard || !v.postData.data?.write_access || !v.permissionUtils.hasPermission('posts.create.allow')) return false
      if (v.postData.data.thread.locked) {
        return v.permissionUtils.hasPermission('posts.create.bypass.locked.admin') || (v.permissionUtils.hasPermission('posts.create.bypass.locked.mod') && v.permissionUtils.moderatesBoard(v.postData.data.board.id))
      }
      return true
    }
    const canSave = () => {
      var text = v.posting.post.body_html
      const imgSrcRegex = /<img[^>]+src="((http:\/\/|https:\/\/|\/)[^">]+)"/g
      const stripTagsRegex = /(<([^>]+)>)/ig
      const images = imgSrcRegex.exec(text)
      text = text.replace(stripTagsRegex, '')
      text = text.trim()
      return text.length || images
    }
    const canMove = () => {
      if (!v.loggedIn) return false
      if (v.bannedFromBoard) return false
      if (!v.postData.data?.write_access) return false
      if (!v.permissionUtils.hasPermission('threads.move.allow')) return false

      const adminBypass = v.permissionUtils.hasPermission('threads.move.bypass.owner.admin')
      const modBypass = v.permissionUtils.hasPermission('threads.move.bypass.owner.mod')

      if (adminBypass) return true
      else if (modBypass) return v.permissionUtils.moderatesBoard(v.postData.data.board.id)
      else return false
    }
    const canPurgeThread = () => {
      if (!v.loggedIn) return false
      if (v.bannedFromBoard) return false
      if (!v.postData.data?.write_access) return false
      if (!v.permissionUtils.hasPermission('threads.purge.allow')) return false

      const adminBypass = v.permissionUtils.hasPermission('threads.purge.bypass.owner.admin')
      const modBypass = v.permissionUtils.hasPermission('threads.purge.bypass.owner.mod')
      const priorityBypass = v.permissionUtils.hasPermission('threads.purge.bypass.owner.priority')
      const userPriority = v.postData.data.posts[0].user.priority

      if (adminBypass) return true
      else if (modBypass) return v.permissionUtils.moderatesBoard(v.postData.data.board.id)
      else if (priorityBypass) return v.permissionUtils.getPriority() < userPriority
      else return false
    }
    const canPurgePost = (post) => {
      if (!v.postData.data?.write_access) return false
      if (!v.loggedIn) return false
      // TODO(boka): check for banned
      // if (BanSvc.banStatus()) return false
      if (!v.permissionUtils.hasPermission('threads.purge.allow')) return false

      const adminBypass = v.permissionUtils.hasPermission('posts.purge.bypass.purge.admin')
      const modBypass = v.permissionUtils.hasPermission('posts.purge.bypass.purge.mod')
      const postUserPriority = post.user.priority
      const postUserId = post.user.id
      const sessionUserPriority = v.permissionUtils.getPriority()
      const sessionUserId = v.authedUser.id
      const moderators = v.postData.data.board.moderators.map((data) => data.id)

      // admins can purge
      if (adminBypass) return true
      // if user is a mod and moderates this board and...
      else if (modBypass && v.permissionUtils.moderatesBoard(v.postData.data.board.id)) {
        // ...if any of the following conditions are met, allow purge
        // user created the post
        return postUserId === sessionUserId ||
          // user has priority
          sessionUserPriority < postUserPriority ||
          // user priorities are equal and the posting user is not a mod
          (sessionUserPriority === postUserPriority && !moderators.includes(post.user.id))
      }
      else return false
    }
    const canSticky = () => {
      if (!v.loggedIn) return false
      if (v.bannedFromBoard) return false
      if (!v.postData.data?.write_access) return false
      if (!v.permissionUtils.hasPermission('threads.sticky.allow')) return false

      const adminBypass = v.permissionUtils.hasPermission('threads.sticky.bypass.owner.admin')
      const modBypass = v.permissionUtils.hasPermission('threads.sticky.bypass.owner.mod')
      const priorityBypass = v.permissionUtils.hasPermission('threads.sticky.bypass.owner.priority')
      const userPriority = v.postData.data.posts[0].user.priority

      if (adminBypass) return true
      else if (modBypass) return v.permissionUtils.moderatesBoard(v.postData.data.board.id)
      else if (priorityBypass) return v.permissionUtils.getPriority() < userPriority
      else return false
    }
    const canLock = () => {
      if (!v.loggedIn) return false
      if (v.bannedFromBoard) return false
      if (!v.permissionUtils.hasPermission('threads.lock.allow')) return false
      if (!v.postData.data?.write_access) return false

      const adminBypass = v.permissionUtils.hasPermission('threads.lock.bypass.owner.admin')
      const modBypass = v.permissionUtils.hasPermission('threads.lock.bypass.owner.mod')
      const priorityBypass = v.permissionUtils.hasPermission('threads.lock.bypass.owner.priority')
      const userPriority = v.postData.data.posts[0].user.priority

      if (v.postData.data.thread.user.id === v.authedUser.id) return true
      else if (adminBypass) return v.permissionUtils.getPriority() <= userPriority
      else if (modBypass) return v.permissionUtils.getPriority() < userPriority && v.permissionUtils.moderatesBoard(v.postData.data.board.id)
      else if (priorityBypass) return v.permissionUtils.getPriority() < userPriority
      else return false
    }
    const canCreatePoll = () => {
      if (!v.loggedIn) return false
      if (v.bannedFromBoard) return false
      if (!v.permissionUtils.hasPermission('threads.createPoll.allow')) return false
      if (!v.postData.data?.write_access) return false
      if (v.postData.data.thread.poll) return false

      const adminBypass = v.permissionUtils.hasPermission('threads.createPoll.bypass.owner.admin')
      const modBypass = v.permissionUtils.hasPermission('threads.createPoll.bypass.owner.mod')
      const priorityBypass = v.permissionUtils.hasPermission('threads.createPoll.bypass.owner.priority')
      const userPriority = v.postData.data.posts[0].user.priority

      if (v.postData.data.thread.user.id === v.authedUser.id) return true
      else if (adminBypass) return true
      else if (modBypass) return v.permissionUtils.getPriority() < userPriority && v.permissionUtils.moderatesBoard(v.postData.data.board.id)
      else if (priorityBypass) return v.permissionUtils.getPriority() < userPriority
      else return false
    }
    const canUpdate = (post) => {
      const adminOwnerBypass = v.permissionUtils.hasPermission('posts.update.bypass.owner.admin')
      const adminLockedBypass = v.permissionUtils.hasPermission('posts.update.bypass.locked.admin')
      const adminDeletedBypass = v.permissionUtils.hasPermission('posts.update.bypass.deleted.admin')
      const modOwnerBypass = v.permissionUtils.hasPermission('posts.update.bypass.owner.mod')
      const modLockedBypass = v.permissionUtils.hasPermission('posts.update.bypass.locked.mod')
      const modDeletedBypass = v.permissionUtils.hasPermission('posts.update.bypass.deleted.mod')
      const priorityOwnerBypass = v.permissionUtils.hasPermission('posts.update.bypass.owner.priority')
      const priorityLockedBypass = v.permissionUtils.hasPermission('posts.update.bypass.locked.priority')
      const priorityDeletedBypass = v.permissionUtils.hasPermission('posts.update.bypass.deleted.priority')
      const moderatesBoard = v.permissionUtils.moderatesBoard(v.postData.data.board.id)
      const authedUserPriority = v.permissionUtils.getPriority()
      const moderators = v.postData.data.board.moderators.map((data) => data.id)
      if (!v.postData.data?.write_access) return false
      if (!v.loggedIn) return false
      if (!v.permissionUtils.hasPermission('posts.update.allow')) return false
      // TODO(boka): check for banned
      // if (BanSvc.banStatus()) return false

      // check if post edit is disabled
      var elevatedPrivileges = adminOwnerBypass || modOwnerBypass || priorityOwnerBypass
      if (postEditDisabled(post.created_at) && !elevatedPrivileges) return false

      // developer note: avoid unreachable code
      // ensure that all if blocks end with else
      // defaults to return false

      // if thread is locked
      if (v.postData.data.thread.locked) {
        if (adminLockedBypass) return true
        else if (modLockedBypass) {
          if (moderatesBoard && v.authedUser.id === post.user.id) return true
          else if (moderatesBoard && authedUserPriority < post.user.priority) return true
          else if (moderatesBoard && authedUserPriority === post.user.priority && !moderators.includes(post.user.id)) return true
          else return false
        }
        else if (priorityLockedBypass && authedUserPriority < post.user.priority) return true
        else return false
      }
      // if post is deleted
      else if (post.deleted) {
        if (adminDeletedBypass) return true
        else if (modDeletedBypass) {
          if (moderatesBoard && authedUserPriority < post.user.priority) return true
          else if (moderatesBoard && authedUserPriority === post.user.priority && !moderators.includes(post.user.id)) return true
          else return false
        }
        else if (priorityDeletedBypass && authedUserPriority < post.user.priority) return true
        else return false
      }
      else {
        if (adminOwnerBypass) return true
        else if (post.user.id === v.authedUser.id) return true
        else if (modOwnerBypass) {
          if (moderatesBoard && authedUserPriority < post.user.priority) return true
          else if (moderatesBoard && (authedUserPriority === post.user.priority && !moderators.includes(post.user.id))) return true
          else return false
        }
        else if (priorityOwnerBypass && authedUserPriority < post.user.priority) return true
        else return false
      }
    }
    const canPostLock = (post) => {
      if (!v.postData.data?.write_access) return false
      if (!v.loggedIn) return false
      // TODO(boka): check for banned
      // if (BanSvc.banStatus()) return false
      if (!v.permissionUtils.hasPermission('posts.lock.allow')) return false

      const moderators = v.postData.data.board.moderators.map((data) => data.id)

      if (v.permissionUtils.hasPermission('posts.lock.bypass.lock.admin')) return true
      else if (v.permissionUtils.hasPermission('posts.lock.bypass.lock.mod')) {
        if (v.permissionUtils.moderatesBoard(v.postData.data.board.id) && v.permissionUtils.getPriority() < post.user.priority) return true
        // Check if mod is moderating another board's mod (which is allowed)
        else if (v.permissionUtils.moderatesBoard(v.postData.data.board.id) && (v.permissionUtils.getPriority() === post.user.priority && !moderators.includes(post.user.id))) return true
        else return false
      }
      else if (v.permissionUtils.hasPermission('posts.lock.bypass.lock.priority')) {
        if (v.permissionUtils.getPriority() < post.user.priority) return true
        // Allow users with priority option to still self mod
        else if (v.permissionUtils.hasPermission('threads.moderated.allow') && v.postData.data.thread.user.id === v.authedUser.id && v.postData.data.thread.moderated && v.authedUser.id !== post.user.id && v.permissionUtils.getPriority() <= post.user.priority) return true
        else return false
      }
      else if (v.permissionUtils.hasPermission('threads.moderated.allow') && v.permissionUtils.hasPermission('posts.lock.bypass.lock.selfMod') && v.permissionUtils.getPriority() <= post.user.priority) {
        if (v.postData.data.thread.user.id === v.authedUser.id && v.postData.data.thread.moderated && v.authedUser.id !== post.user.id) return true
        else return false
      }
      else return false
    }
    const canDelete = (post) => {
      if (!v.postData.data?.write_access) return false
      if (!v.loggedIn) return false
      // TODO(boka): check for banned
      // if (BanSvc.banStatus()) return false
      if (!v.permissionUtils.hasPermission('posts.delete.allow')) return false

      const moderators = v.postData.data.board.moderators.map((data) => data.id)

      // if thread is locked
      if (v.postData.data.thread.locked) {
        if (v.permissionUtils.hasPermission('posts.delete.bypass.locked.admin')) return true
        else if (v.permissionUtils.hasPermission('posts.delete.bypass.locked.mod')) {
          if (v.permissionUtils.moderatesBoard(v.postData.data.board.id) && v.permissionUtils.getPriority() < post.user.priority) return true
          // Check if mod is moderating another board's mod (which is allowed)
          else if (v.permissionUtils.moderatesBoard(v.postData.data.board.id) && (v.permissionUtils.getPriority() === post.user.priority && !moderators.includes(post.user.id))) return true
          else return false
        }
        else if (v.permissionUtils.hasPermission('posts.delete.bypass.locked.priority')) {
          if (v.permissionUtils.getPriority() < post.user.priority) return true
          else if (v.permissionUtils.hasPermission('threads.moderated.allow') && v.postData.data.thread.user.id === v.authedUser.id && v.postData.data.thread.moderated && v.authedUser.id !== post.user.id && v.permissionUtils.getPriority() <= post.user.priority) return true
          else return false
        }
        else return false
      }
      // if user created post
      else if (post.user.id === v.authedUser.id) return true
      // if thread is moderated and user started the thread and user can moderate threads and user can self mod and user's priority is higher than posting user
      else if (v.postData.data.thread.moderated && v.postData.data.thread.user.id === v.authedUser.id && v.permissionUtils.hasPermission('threads.moderated.allow') && v.permissionUtils.hasPermission('posts.delete.bypass.owner.selfMod') && v.permissionUtils.getPriority() <= post.user.priority) return true
      // if user is an admin
      else if (v.permissionUtils.hasPermission('posts.delete.bypass.owner.admin')) return true
      // if user is a mod
      else if (v.permissionUtils.hasPermission('posts.delete.bypass.owner.mod')) {
        if (v.permissionUtils.moderatesBoard(v.postData.data.board.id) && v.permissionUtils.getPriority() < post.user.priority) return true
        // Check if mod is moderating another board's mod (which is allowed)
        else if (v.permissionUtils.moderatesBoard(v.postData.data.board.id) && (v.permissionUtils.getPriority() === post.user.priority && !v.moderators.includes(post.user.id))) return true
        else return false
      }
      else if (v.permissionUtils.hasPermission('posts.delete.bypass.owner.priority')) {
        if (v.permissionUtils.getPriority() < post.user.priority) return true
        else if (v.permissionUtils.hasPermission('threads.moderated.allow') && v.postData.data.thread.user.id === v.authedUser.id && v.postData.data.thread.moderated && v.authedUser.id !== post.user.id && v.permissionUtils.getPriority() <= post.user.priority) return true
        else return false
      }
      else return false
    }
    const openEditThread = () => v.editThread = true
    const closeEditThread = () => v.editThread = false
    const updateThreadLock = (thread) => {
      const promise = thread.locked ? threadsApi.unlock(thread.id) : threadsApi.lock(thread.id)
      promise.then(() => thread.locked = !thread.locked)
      .then($breadcrumbs.updateThreadLock)
    }
    const updateThreadSticky = (thread) => {
      const promise = thread.sticky ? threadsApi.unsticky(thread.id) : threadsApi.sticky(thread.id)
      promise.then(() => thread.sticky = !thread.sticky)
    }
    const updateThreadTitle = () => {
      const title = v.postData.data.thread.title
      const id = v.postData.data.thread.id
      return threadsApi.title(id, title)
        .then(() => {
          v.editThread = false
          $alertStore.success(`Thread's title changed to: ${title}`)
          $breadcrumbs.updateLabelInPlace(title)
        })
        .catch(() => $alertStore.error('Error changing thread title'))
    }
    const createPoll = () => console.log('createPoll')
    const showEditDate = (post) => dayjs(post.updated_at).isAfter(dayjs(post.created_at))
    const openPostsPurgePostModal = (post, postIndex) => {
      v.selectedPost = post
      v.selectedPostIndex = postIndex
      v.showPostsPurgePostModal = true
    }
    const openPostsPurgeThreadModal = () => {
      v.showPostsPurgeThreadModal = true
    }
    const openPostsDeleteModal = (post) => {
      v.selectedPost = post
      v.showPostsDeleteModal = true
    }
    const openPostsUndeleteModal = (post) => {
      v.selectedPost = post
      v.showPostsUndeleteModal = true
    }
    const openPostsReportModal = (post) => {
      v.selectedPost = post
      v.showPostsReportModal = true
    }
    const lockPost = (post) => {
      postsApi.lock(post.id).then(() => post.locked = true)
    }
    const unlockPost = (post) => {
      postsApi.unlock(post.id).then(() => post.locked = false)
    }
    const loadEditor = (post) => console.log(post, 'loadEditor')
    const addQuote = (post) => console.log(post, 'addQuote')
    const copyQuote = (post) => console.log(post, 'copyQuote')
    const showUserControls = () => (v.loggedIn && (!v.postData.data.thread.watched || canCreatePoll()))
    const highlightPost = () => {
      if ($route.hash) {
        const postId = $route.hash.substring(1)
        v.postData.data.posts = v.postData.data.posts.map(p => {
          p.highlighted = p.id === postId
          return p
        })
      }
    }
    const watchThread = () => {
      const watching = v.postData.data.thread.watched
      const toggleWatchThread = watching ? watchlistApi.unwatchThread : watchlistApi.watchThread
      toggleWatchThread(v.postData.data.thread.id)
      .then(() => v.postData.data.thread.watched = !v.postData.data.thread.watched)
    }

    const openMoveThreadModal = () => v.showPostsMoveThreadModal = true
    const toggleIgnoredPosts = post => {
      const toggleIgnore = post.user._ignored ? usersApi.unignore : usersApi.ignore
      toggleIgnore(post.user)
      .then(() => {
        $alertStore.success(`${post.user._ignored ? 'Unig' : 'Ig'}noring posts from user ${post.user.username}`)
        processPosts()
        .then(data => {
          v.postData.data = data
          $route.hash ? highlightPost() : null
        })
      })
    }

    /* Internal Data */
    const $route = useRoute()
    const $prefs = inject(PreferencesStore)
    const $auth = inject(AuthStore)
    const $breadcrumbs = inject(BreadcrumbStore)
    const $alertStore = inject('$alertStore')

    /* View Data */
    const v = reactive({
      authedUser: $auth.user,
      selectedPost: null,
      selectedPostIndex: 0,
      prefs: $prefs.data,
      loggedIn: $auth.loggedIn,
      postData: {data: {}},
      editThread: false,
      addPoll: false,
      pollValid: false,
      resetPoll: false,
      posting: {
        post: {}
      },
      permissionUtils: $auth.permissionUtils,
      bannedFromBoard: false,
      defaultAvatar: window.default_avatar,
      defaultAvatarShape: window.default_avatar_shape,
      disableSignature: false,
      showPostsPurgePostModal: false,
      showPostsPurgeThreadModal: false,
      showPostsDeleteModal: false,
      showPostsUndeleteModal: false,
      showPostsReportModal: false,
      showPostsMoveThreadModal: false
    })

    /* Watched Data */
    watch(() => v.loggedIn, () => processPosts().then(data => {
      v.postData.data = data
      BanStore.updateBanNotice(v.postData.data.banned_from_board)
      v.bannedFromBoard = v.postData.data.banned_from_board
      $route.hash ? highlightPost() : null
    })) // Update on login

    watch(() => $route.hash, () => highlightPost())

    return {
      ...toRefs(v),
      canEditTitle,
      canPost,
      canSave,
      canMove,
      canPurgeThread,
      canPurgePost,
      canSticky,
      canLock,
      canCreatePoll,
      canUpdate,
      canPostLock,
      canDelete,
      openEditThread,
      updateThreadLock,
      updateThreadSticky,
      updateThreadTitle,
      closeEditThread,
      createPoll,
      truncate,
      humanDate,
      userRoleHighlight,
      showEditDate,
      openPostsPurgePostModal,
      openPostsPurgeThreadModal,
      openPostsDeleteModal,
      openPostsUndeleteModal,
      openPostsReportModal,
      lockPost,
      unlockPost,
      loadEditor,
      addQuote,
      copyQuote,
      highlightPost,
      showUserControls,
      watchThread,
      toggleIgnoredPosts,
      openMoveThreadModal
    }
  }
}
</script>

<style lang="scss">
/*-------------- Posts (Thread View) Layout -------------- */

$postWidth__mobile: calc(100vw - 2rem);

#public-content {
  .posts & {
    grid-template-columns: minmax(0, 3fr) minmax($sidebarWidth, 1fr);
    grid-template-areas:
      "top sidebar"
      "ads sidebar"
      "main sidebar";
    grid-template-rows: auto auto 1fr;

    @include break-mobile-sm {
      grid-template-areas:
        "top top"
        "sidebar sidebar"
        "ads ads"
        "main main";
      grid-template-columns: 1fr;
    }
  }
}

ad-viewer {
  grid-area: ads;
  margin: 1rem 0;
}

.sidebar {
  grid-area: sidebar;

  .sidebar-block {
    display: block;
    position: sticky;
    top: $header-offset;
  }

  .sidebar-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 1.5rem;
  }

  .button {
    width: 100%;
  }

  .post-tools {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: $font-size-xl;
    width: 100%;

    a {
      color: $secondary-font-color;

      &.clicked {
        color: $color-primary;

        svg {
          fill: $color-primary;
        }
      }
    }
  }

  @include break-mobile-sm {
    width: $postWidth__mobile;
    margin: 1rem 0;

    .sidebar-actions {
      padding-top: 0;
    }
  }
}

.thread-controls-wrap {
  grid-area: top;
  margin: 0;
  padding: 1rem 0;
  width: 100%;
  border-bottom: $border;

  .inverted-button {
    color: $secondary-font-color;
    padding-top: 0.35rem;
    padding-bottom: 0.35rem;
    text-align: center;
    &:hover {
      background-color: $secondary-font-color-light;
      border-color: $secondary-font-color;
      color: $secondary-font-color-dark;
    }
  }
  .controls.two-thirds-column {
    text-align: right;
    .control:last-child {
      margin-right: 0.5rem;
    }
  }

  .user-controls-base {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;

    a {
      padding: 0 0.5rem;
    }
  }

  a {
    color: $secondary-font-color;
  }

  .do-edit {
    margin-left: 0.5rem;
  }

  .edit-thread-title {
    .actions {
      display:flex;
      justify-content: flex-end;

      button {
        margin-left: 1rem;
      }
    }
  }
}

.thread-data {
  @include pad(0 0 1rem 0);
  grid-area: main;
}

.post-block {
    @include transition(background-color 250ms ease-in);
    min-height: 11rem;
    // max-width: calc(#{$view-maxWidth} - #{$sidebarWidth} - 2rem);
    border-bottom: $border-trans;
    padding: 1.5rem 0.5rem 2rem;

    &.highlighted {
      background-color: $color-highlighted;

      .post-user .user-avatar .online svg {
        stroke: $color-highlighted;
      }
    }
    &.editing {
      background-color: RGBA(235, 200, 120, 0.5);
    }
    &.hidden {
      background-color: $sub-header-color;
    }
    &.deleted {
      min-height: 0;
      padding: 0.5rem 0.5rem;
      color: $secondary-font-color;
      text-align: center;
    }

    &:hover {
      .post-content {
        .post-title {
          .post-action {
            .post-action-icon, a {
              opacity: 1;
            }
          }
        }
      }
    }

    .post-block-grid {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
    }


    $postUserMargin: 1rem;
    $postUserAvatarSize: calc(#{$postUserWidth} - #{$postUserMargin});

    .post-user {
      // width: $postUserWidth;
      flex: 0 0 $postUserWidth;
      margin-right: $postUserMargin;
      font-size: $font-size-tiny;
      text-align: center;
      text-transform: uppercase;

      a {
        display: block;
      }
      .user-avatar {
        @include bg-cover;
        background: no-repeat center center;
        position: relative;
        margin-bottom: 1rem;
        width: $postUserWidth;
        height: $postUserWidth;

        .online {
          position: absolute;
          top: -2px;
          right: -2px;

          svg {
            stroke: $base-background-color;
            stroke-width: 6;
            fill: green;
            width: 20px;
            height: auto;
          }
        }

         a, img {
          width: 100%;
          height: 100%;
        }

        &.circle {
          img {
            @include border-radius(100px);
            object-fit: cover;
          }
        }
        &.rect {
          height: calc(#{$postUserWidth / 1.5});

          img {
            object-fit: cover;
          }

          .online {
            top: -8px;
            right: -8px
          }
        }
      }
      .user-trust,
      .user-rank,
      .user-activity, .original-poster {
        line-height: 1;
        color: $secondary-font-color;
        overflow: hidden;
        margin-bottom: 0.25rem;
        white-space: nowrap;
        text-align: center;
        text-transform: uppercase;
        width: 100%;

        &-value {
          font-weight: 600;
        }
      }
      .original-poster {
        color: #f04124;
      }

      &.rect {
        .user-avatar {
          height: calc(100% / 1.5);

          img {
            border-radius: 0;
          }
        }
      }
    }

    .post-content {
      width: calc(100% - #{$postUserWidth} - #{$postUserMargin});

      .bbcode-column {
        img.image-loader.loaded {
          max-width: 350px;
          margin: 5px auto;
          display: inline;
        }
      }
      .post-title {
        color: $secondary-font-color;
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        width: 100%;

        .post-title-user {
          display: flex;
          align-items: center;
          flex: 2 1 auto;
          flex-wrap: wrap;
        }

        span.username {
          margin-right: 0.5rem;
          color: $base-font-color;
          font-weight: 600;
          &:hover {
            color: $color-primary;
          }
        }

        .user-role {
          @include truncate-ellipsis;
          background-color: transparent;
          border: 1px solid $secondary-font-color;
          border-radius: 2px;
          color: $secondary-font-color-dark;
          display: inline-block;
          font-size: $font-size-xs;
          font-weight: 400;
          line-height: 1.4;
          margin-right: 0.5rem;
          max-width: 140px;
          padding: 1px 6px;
          text-align: center;
        }

        .timestamp, .display-name {
          display: inline-block;
          color: $secondary-font-color;
          font-size: $font-size-xs;
          font-weight: 400;
        }
        .display-name {
          color: $secondary-font-color-dark;
        }

        .post-action {
          // opacity: .4;
          @include list-clean;
          display: flex;
          align-items: center;
          justify-self: flex-end;
          color: $secondary-font-color;
          // transition: opacity ease-in-out 150ms;

          li {
            padding-left: 1rem;
          }

          svg {
            fill: $secondary-font-color;
          }

          .post-action-icon,
          a {
            color: $secondary-font-color;
            display: flex;
            font-size: $font-size-sm;
            opacity: .25;
            transition: opacity ease-in-out 150ms;

            @include break-mobile-sm {
              opacity: 1;
            }

            &.selected {
              opacity: .6;

              svg {
                // fill: $secondary-font-color-dark;
                fill: $dark-text-default;
              }
            }

            &:hover {
              svg {
                fill: $color-primary;
              }
            }
          }
        }
      }

      .post-sig-border {
        clear: both;
        width: 250px;
        border-top: $border;
        margin-bottom: 0.5rem;
        margin-top: 0.5rem;
      }
      .post-signature {
        @include truncate-ellipsis;
        clear: both;
        color: $secondary-font-color;
        border-top: $border;
        border-color: lighten($border-color, 7%);
        font-size: 13px;
        line-height: 1.2;;
        margin-top: 1rem;
        max-height: 3.5rem;
        padding-top: 0.5rem;
        word-wrap: break-word;
        white-space: pre-wrap;
        a {
          color: $secondary-font-color;
          &:hover {
            color: $color-primary;
          }
        }
      }

      @include break-mobile-sm {
        width: $postWidth__mobile;
      }
    }
  }

.thread-title {
  flex: 1 0 calc(100% - 36px);
  margin-bottom: 0;
  max-width: 100%;
}

.page-header-split h1 {
  color: #222;
  display: inline;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  text-transform: initial;
}

.threadStates {
  margin-top: 4px;
}

#post-spacer {
  min-height: 175px;
}

#post-tools-fixed {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 3rem;
  z-index: 900;
  // border-top: $border;
  background-color: rgba($base-background-color, 0.9);
  .tool-wrap {
    max-width: $view-maxWidth;
    margin: 0 auto;
    .tool-container {
      line-height: 3rem;
      .button {
        margin: 0;
        padding: 0.35rem 1rem;
      }
      .left-col {
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .right-col {
        text-align: right;
      }
    }
  }
}

#post-tools-fixed .tool-wrap .tool-container, .thread-controls-wrap .two-thirds-column {
  .control {
    display: inline-block;
    text-align: center;
    line-height: 2.25rem;
    margin-right: 1.5rem;
    a {
      color: $secondary-font-color;
      &.clicked {
        color: $color-primary;
      }
    }
  }
}


// Bottom actions and pagination
.actions-bottom {
  border-top: 1px solid $border-color;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background: $base-background-color;
  padding: 0.75rem;
  z-index: 1000;

  &-grid {
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(240px, 1fr);
    align-items: center;
    column-gap: 2rem;
    max-width: $view-maxWidth;
    margin: 0 auto;
  }

  .button {
    display: block;
    margin-bottom: 0;
    width: 100%;
  }
}
.pagination-bottom {
  justify-self: end;

  ul {
    &.pagination {
      li {
        a {
          font-size: $font-size-sm;;
        }
      }
    }
  }
}

@include break-mobile-sm {
  .posts {
    .actions-bottom {
      .actions-bottom-grid {
        grid-template-columns: 1fr auto;
        align-items: center;
        justify-items: center;
        column-gap: 1rem;
      }

      .pagination-bottom {
        justify-self: end;
        // position: fixed;
        // bottom: 3rem;
        // left: 0;
        // right: 0;
        // background-color: #fff;
        // border-top: 1px solid $border-color;
        // text-align: center;
      }
    }
  }
}

// Posts Layout Mobile

@include break-max-large {
  .thread-controls-wrap {
    // margin-left: -1rem;
    // margin-right: -1rem;
    // padding-left: 1rem;
    // padding-right: 1rem;

    // margin: 0;
    // padding-bottom: 1rem;
    // padding-top: 1rem;

    .controls.two-thirds-column {
      text-align: center;
      // @include span-columns(6);
      .control:last-child {
        margin-right: 1rem;
      }
    }
    .controls.one-third-column {
      // @include span-columns(6);
      .button {
      //   @include span-columns(12);
      }
    }
  }
}

// @include media($mobile-portrait) {
//   .thread-data .post-block .post-content .display-name {
//     float: none;
//     width: 100%;
//   }
//   .thread-controls-wrap {
//     .controls.one-third-column {
//       // @include span-columns(8);
//     }
//     .controls.two-thirds-column {
//       text-align: center;
//       // @include span-columns(8);
//       .control:last-child {
//         margin-right: 0;
//       }
//     }
//   }
//   #post-tools-fixed .tool-wrap {
//     .right-col .button {
//       width: 100%;
//       .hide-post {
//         display: none;
//       }
//     }
//   }
// }

@include break-mobile-sm {

  .thread-data {
    margin-bottom: 3rem;
  }

  .thread-data .post-block .post-user {
    display: none;
  }
  .thread-data .post-block .post-content {
    margin-left: 0;
  }
  .thread-data .post-block .post-content .post-title {
    flex-direction: column;
    align-items: flex-start;;
  }
  .thread-data .post-block .post-content .timestamp {
    float: none;
    width: 100%;
  }
  .thread-data .post-block .post-content .post-action {
    align-self: flex-start;

    li {
      padding-left: 0;
      padding-right: 1rem;
    }
  }
  #post-tools-fixed {
    // height: 2.5rem;
    .tool-wrap .tool-container {
      line-height: 2.5rem;
      padding: 0 $base-grid-padding;
      .left-col {
        // @include span-columns(5);
      }
      .right-col {
        // @include span-columns(3);
        .button {
          padding: 0.15rem 0.76rem;
          display: inline-block;
        }
      }
    }
  }
}
</style>
