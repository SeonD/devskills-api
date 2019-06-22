'use strict'

import { Response, Request, Router } from 'express';
import { Connection } from 'typeorm';

import { connection } from '../database';
import { basicRouterFactory } from './basic';
import { createEntity, getOneById } from '../handler/common';

import { Skill } from '../model/entity/skill';
import { Story } from '../model/entity/story';

export const router = new Router();

const skillRouter = basicRouterFactory('skill');
// Register additional skill routes
// Create a new story tied to a skill
skillRouter.post('/:skillId/story/', (req: Request, res: Response) => {
});
// Tie an existing story to skill
skillRouter.put('/:skillId/story/:storyId', (req: Request, res: Response) => {

});

router.use('/skill', skillRouter);

const storyRouter = basicRouterFactory('story');
// Register additional story routes
// Create a new story tied to a skill
storyRouter.post('/:storyId/skill/', (req: Request, res: Response) => {
  getOneById('story', req.params.storyId).then((story: Story) => {
    const skill = new Skill();
    skill.name = 'new skill under block';
    // story.skills = [skill];

    return connection.then((conn: Connection) => {
      return conn.manager.save(story);
    });
  }).then((story: Story) => {
    res.status(202).json({
      story
    });
  });
});
// Tie an existing story to skill
storyRouter.put('/:storyId/skill/:skillId', (req: Request, res: Response) => {

});
router.use('/story', storyRouter);
