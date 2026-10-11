// Admin o'zgarishlarini GitHub repozitoriyga bitta commit qilib yozish (Git Data API).
// Token faqat admin brauzerida saqlanadi va hech qayerga yuborilmaydi (faqat api.github.com ga).
import { GITHUB_REPO } from '../config';
import { storage } from '../store/storage';

const API = `https://api.github.com/repos/${GITHUB_REPO.owner}/${GITHUB_REPO.repo}`;

export const getToken = () => storage.get<string>('gh_token', '');
export const setToken = (t: string) => (t ? storage.set('gh_token', t.trim()) : storage.remove('gh_token'));

async function gh<T>(token: string, path: string, init?: RequestInit): Promise<T> {
  const r = await fetch(API + path, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
    },
  });
  if (!r.ok) {
    let msg = `${r.status}`;
    try {
      msg += ' ' + ((await r.json()) as { message?: string }).message;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  return (await r.json()) as T;
}

/** Token to'g'riligini va yozish huquqini tekshirish */
export async function checkToken(token: string): Promise<{ ok: boolean; msg: string }> {
  try {
    const repo = await gh<{ full_name: string; permissions?: { push?: boolean } }>(token, '');
    if (repo.permissions && repo.permissions.push === false) return { ok: false, msg: `${repo.full_name}: yozish huquqi yo'q` };
    return { ok: true, msg: repo.full_name };
  } catch (e) {
    return { ok: false, msg: String((e as Error).message) };
  }
}

export interface OutFile {
  path: string; // repozitoriy ichidagi yo'l, masalan public/content.json
  content: string; // utf-8 matn yoki base64
  base64?: boolean;
}

/** Fayllarni bitta commit bilan main branchga yozish */
export async function commitFiles(token: string, files: OutFile[], message: string) {
  const ref = await gh<{ object: { sha: string } }>(token, `/git/ref/heads/${GITHUB_REPO.branch}`);
  const head = ref.object.sha;
  const commit = await gh<{ tree: { sha: string } }>(token, `/git/commits/${head}`);
  const tree = [];
  for (const f of files) {
    const blob = await gh<{ sha: string }>(token, '/git/blobs', {
      method: 'POST',
      body: JSON.stringify({ content: f.content, encoding: f.base64 ? 'base64' : 'utf-8' }),
    });
    tree.push({ path: f.path, mode: '100644', type: 'blob', sha: blob.sha });
  }
  const newTree = await gh<{ sha: string }>(token, '/git/trees', {
    method: 'POST',
    body: JSON.stringify({ base_tree: commit.tree.sha, tree }),
  });
  const newCommit = await gh<{ sha: string }>(token, '/git/commits', {
    method: 'POST',
    body: JSON.stringify({ message, tree: newTree.sha, parents: [head] }),
  });
  await gh(token, `/git/refs/heads/${GITHUB_REPO.branch}`, { method: 'PATCH', body: JSON.stringify({ sha: newCommit.sha }) });
  return newCommit.sha;
}
