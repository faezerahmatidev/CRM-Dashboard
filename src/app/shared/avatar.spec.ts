import { avatar, members } from './avatar';
import { blankProject } from '../projects/projects-data';

describe('avatar helpers', () => {
  it('should build a member with palette color by index', () => {
    expect(avatar('NG', 0)).toEqual({
      initials: 'NG',
      color: 'linear-gradient(135deg,#5e81f4,#9698d6)',
    });
  });

  it('should wrap the palette index', () => {
    expect(avatar('X', 6).color).toBe(avatar('Y', 0).color);
  });

  it('should map initials arrays to members', () => {
    expect(members(['AB', 'CD'])).toEqual([avatar('AB', 0), avatar('CD', 1)]);
  });
});

describe('blankProject', () => {
  it('should trim the name and derive the brand glyph', () => {
    const project = blankProject('  New One  ');
    expect(project.name).toBe('New One');
    expect(project.brand.glyph).toBe('N');
    expect(project.category).toBe('Development');
    expect(project.members).toEqual([]);
  });

  it('should fall back to New Project for blank names', () => {
    expect(blankProject('   ').name).toBe('New Project');
  });
});
